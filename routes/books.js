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
const upload = multer({ dest: uploadPath, fileFilter: (req, file, cb) => {
    cb(null, imageMimeTypes.includes(file.mimetype));
} });


//All authors route
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
        req.filename = req.file != null ? req.file.filename : null;
        const book = new Book({
            title: req.body.title,
            description: req.body.description,
            publishDate: new Date(req.body.publishDate),
            pageCount: req.body.pageCount,
            author: req.body.author,
            coverImageName: req.filename,
            coverImage: req.file != null ? req.file.buffer : null
        });
        try {
            const newBook = await book.save();
            //res.redirect(`books/${newBook.id}`);
            res.redirect("books");
        } catch (err) {
            console.log("Book save error:", err); 
            if (book.coverImageName != null) {
                removeBookCover(book.coverImageName);
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
