import mongoose from "mongoose";

const coverImageBasePath = "uploads/bookCovers";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: false  // Made optional since FilePond handles validation
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author"
    }
})

const Book = mongoose.model("Book", bookSchema);

export { coverImageBasePath };
export default Book;