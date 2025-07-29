import express from "express";
const router = express.Router();
import Author from "../models/author.js";

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


export default router;
