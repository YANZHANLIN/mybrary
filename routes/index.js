import express from "express";

//create the router
const router = express.Router();

//get request to the root route
router.route("/")
    .get((req, res) => {
        res.locals.title = "Mybrary";
        res.render("index");
    })

export default router;