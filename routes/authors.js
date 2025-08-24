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
            
            // Only query book counts if there are authors
            let authorsWithBookCounts = [];
            if (authors.length > 0) {
                authorsWithBookCounts = await Promise.all(
                    authors.map(async (author) => {
                        try {
                            const bookCount = await Book.countDocuments({ author: author._id });
                            return {
                                ...author.toObject(),
                                bookCount: bookCount
                            };
                        } catch (err) {
                            console.log(`Error counting books for author ${author._id}:`, err);
                            return {
                                ...author.toObject(),
                                bookCount: 0
                            };
                        }
                    })
                );
            }
            
            res.render("authors/index", {authors: authorsWithBookCounts, searchOptions: req.query});
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

// Route to display all books by a specific author (MUST come before /:id)
router.route("/:id/books")
    .get(async (req, res) => {
        try {
            const author = await Author.findById(req.params.id);
            if (!author) {
                return res.redirect("/authors");
            }
            
            // Get all books by this author with pagination
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 12; // 12 books per page for grid layout
            const skip = (page - 1) * limit;
            
            const books = await Book.find({ author: author._id })
                .sort({ createdAt: 'desc' })
                .skip(skip)
                .limit(limit);
            
            const totalBooks = await Book.countDocuments({ author: author._id });
            const totalPages = Math.ceil(totalBooks / limit);
            
            res.locals.title = `Mybrary - Books by ${author.name}`;
            res.render("authors/books", { 
                author: author, 
                books: books, 
                currentPage: page,
                totalPages: totalPages,
                totalBooks: totalBooks,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            });
        } catch (err) {
            console.log("Error fetching author books:", err);
            res.redirect("/authors");
        }
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
