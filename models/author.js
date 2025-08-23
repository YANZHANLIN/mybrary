import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt fields automatically
})

const Author = mongoose.model("Author", authorSchema);

export default Author;