import express from "express";
const router = express.Router();
import Book from "../models/book.js";
import Author from "../models/author.js";
import { coverImageBasePath } from "../models/book.js";
import path from "path";
import fs from "fs";
import multer from "multer";

const uploadPath = path.join("public", coverImageBasePath);
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

// Ensure upload directory exists
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure multer for simple file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'cover-' + uniqueSuffix + ext);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (imageMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images are allowed.'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

//All books route
router.route("/")
    .get(async (req, res) => {
        let query = Book.find();
        if (req.query.title != null && req.query.title != '') {
            query = query.regex('title', new RegExp(req.query.title, 'i'));
        }
        if (req.query.author != null && req.query.author != '') {
            query = query.where('author').equals(req.query.author);
        }
        if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
            query = query.lte('publishDate', req.query.publishedBefore);
        }
        if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
            query = query.gte('publishDate', req.query.publishedAfter);
        }
        try {
            const books = await query.populate('author').sort({ createdAt: 'desc' }).exec();
            const authors = await Author.find({});
            res.locals.title = "Mybrary - Books Library";
            res.render('books/index', {
                books: books,
                authors: authors,
                searchOptions: req.query
            });
        } catch {
            res.redirect('/');
        }
    })
    .post(upload.single("cover"), async (req, res) => {
        try {
            const book = new Book({
                title: req.body.title,
                description: req.body.description,
                publishDate: new Date(req.body.publishDate),
                pageCount: req.body.pageCount,
                author: req.body.author,
                coverImageName: req.file ? req.file.filename : null
            });

            const newBook = await book.save();
            res.redirect("books");
        } catch (err) {
            console.log("Book save error:", err); 
            if (req.file) {
                removeBookCover(req.file.filename);
            }
            renderNewPage(res, book, true);
        }
    })

router.route("/new")
.get(async (req, res) => {
    renderNewPage(res, new Book());
})

// Individual book routes
router.route("/:id")
    .get(async (req, res) => {
        try {
            const book = await Book.findById(req.params.id).populate('author');
            if (!book) {
                return res.redirect("/books");
            }
            res.locals.title = `Mybrary - ${book.title}`;
            res.render("books/show", { book: book });
        } catch (err) {
            res.redirect("/books");
        }
    })
    .put(upload.single("cover"), async (req, res) => {
        try {
            let book = await Book.findById(req.params.id);
            if (!book) {
                return res.redirect("/books");
            }

            // Update book fields
            book.title = req.body.title;
            book.description = req.body.description;
            book.publishDate = new Date(req.body.publishDate);
            book.pageCount = req.body.pageCount;
            book.author = req.body.author;

            // Update cover image if new one provided
            if (req.file) {
                // Remove old cover if exists
                if (book.coverImageName) {
                    removeBookCover(book.coverImageName);
                }
                book.coverImageName = req.file.filename;
            }

            await book.save();
            res.redirect(`/books/${book._id}`);
        } catch (err) {
            console.log("Book update error:", err);
            if (req.file) {
                removeBookCover(req.file.filename);
            }
            res.render("books/edit", { book: book, errorMessage: "Error updating Book" });
        }
    })
    .delete(async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            if (!book) {
                return res.redirect("/books");
            }
            
            // Remove cover image if exists
            if (book.coverImageName) {
                removeBookCover(book.coverImageName);
            }
            
            await Book.findByIdAndDelete(req.params.id);
            res.redirect("/books");
        } catch (err) {
            res.redirect("/books");
        }
    })

router.route("/:id/edit")
    .get(async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            if (!book) {
                return res.redirect("/books");
            }
            const authors = await Author.find({});
            res.locals.title = `Mybrary - Edit ${book.title}`;
            res.render("books/edit", { book: book, authors: authors });
        } catch (err) {
            res.redirect("/books");
        }
    })

function removeBookCover(filename) { 
    fs.unlink(path.join(uploadPath, filename), (err) => {
        if (err) console.error("Error deleting book cover:", err);
    });
}

async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find({});
        const params = {
            authors: authors,
            book: book
        }
        if (hasError) params.errorMessage = "Error creating Book";
        res.render("books/new", params);
    } catch (err) {
        res.redirect("/");
    }
}

export default router;
