import express from "express";
import Book from "../models/book.js";
//create the router
const router = express.Router();

//All routes for the root route
router.route("/")
    .get(async (req, res) => {
        try {
            // Get the 10 most recently added books
            const recentBooks = await Book.find({})
                .populate('author')
                .sort({ createdAt: 'desc' })
                .limit(10)
                .exec();
            
            res.locals.title = "Mybrary homepage";
            res.render("index", { recentBooks: recentBooks });
        } catch (err) {
            console.log("Error fetching recent books:", err);
            res.locals.title = "Mybrary homepage";
            res.render("index", { recentBooks: [] });
        }
    })


export default router;