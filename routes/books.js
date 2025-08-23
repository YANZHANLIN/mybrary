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
