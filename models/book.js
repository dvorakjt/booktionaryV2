const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    googleId: {
        type: String,
        required: "id is required"
    },
    title: {
        type: String,
        required: "Book must have a title"
    },
    authors: {
        type: String
    },
    description: {
        type: String
    },
    imgUrl: {
        type: String
    },
    link: {
        type: String
    }
})

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;