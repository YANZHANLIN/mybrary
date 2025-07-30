//import dotenv for environment variables and check if the environment is production
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}
//import the necessary modules for file system and url and created the __dirname variable
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);
//import the necessary modules for the express app
import express from "express";
const app = express();
import ejs from "ejs";
import expressEjsLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

//set everything 
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressEjsLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

//connect to the mongo database
import mongoose from "mongoose";
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

//import and use the routes
import indexRouter from "./routes/index.js";
import authorRouter from "./routes/authors.js";
import bookRouter from "./routes/books.js";
app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);



//listen to the port
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});