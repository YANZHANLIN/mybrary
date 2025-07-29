import express from "express";
//create the router
const router = express.Router();

//All routes for the root route
router.route("/")
    .get((req, res) => {
        res.locals.title = "Mybrary homepage";
        res.render("index");
    })


export default router;