import express from "express";
const router = express.Router();
import Author from "../models/author.js";
import Book from "../models/book.js";

//All authors route
router.route("/")
    .get(async (req, res) => {
        let searchOptions = {};
        if (req.query.name != null && req.query.name !== "") {
            searchOptions.name = new RegExp(req.query.name, "i");
        }
        try {
            res.locals.title = "Mybrary authors page"; 
            const authors = await Author.find(searchOptions);
            res.render("authors/index", {authors: authors, searchOptions: req.query});
        } catch (err) {
            res.redirect("/");
        }
    })
    .post(async (req, res) => {
        const author = new Author({
            name: req.body.name
        })
        try {
            const newAuthor = await author.save();
            // res.redirect(`authors/${newAuthor.id}`);
            res.redirect(`authors`);
        } catch (err) {
            res.render("authors/new", {author: author, errorMessage: "Error creating Author"});
        }
    })

router.route("/new")
.get((req, res) => {
    res.locals.title = "Mybrary new authors page";
    res.render("authors/new", {author: new Author()});
})

router.route("/:id")
    .get(async (req, res) => {
        try {
            const author = await Author.findById(req.params.id);
            if (!author) {
                return res.redirect("/authors");
            }
            
            // Get all books by this author
            const books = await Book.find({ author: author._id }).sort({ createdAt: 'desc' });
            
            res.locals.title = `Mybrary - ${author.name}`;
            res.render("authors/show", { author: author, books: books });
        } catch (err) {
            res.redirect("/authors");
        }
    })
    .put(async (req, res) => {
        try {
            let author = await Author.findById(req.params.id);
            if (!author) {
                return res.redirect("/authors");
            }
            author.name = req.body.name;
            await author.save();
            res.redirect(`/authors/${author.id}`);
        } catch (err) {
            res.render("authors/edit", {author: author, errorMessage: "Error updating Author"});
        }
    })
    .delete(async (req, res) => {
        try {
            const author = await Author.findById(req.params.id);
            if (!author) {
                return res.redirect("/authors");
            }
            await Author.findByIdAndDelete(req.params.id);
            res.redirect("/authors");
        } catch (err) {
            res.redirect("/authors");
        }
    })

router.route("/:id/edit")
    .get(async (req, res) => {
        try {
            const author = await Author.findById(req.params.id);
            if (!author) {
                return res.redirect("/authors");
            }
            res.locals.title = `Mybrary - Edit ${author.name}`;
            res.render("authors/edit", {author: author});
        } catch (err) {
            res.redirect("/authors");
        }
    })

export default router;
