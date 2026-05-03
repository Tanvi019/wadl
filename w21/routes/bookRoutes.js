const express = require("express");
const router = express.Router();
const Book = require("../models/Book");


// ➤ Add Book
router.post("/", async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.send("Book Added Successfully");
    } catch (err) {
        res.status(500).send(err);
    }
});


// ➤ Get All Books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
});


// ➤ Update Book
router.put("/:id", async (req, res) => {
    try {
        await Book.findByIdAndUpdate(req.params.id, req.body);
        res.send("Book Updated Successfully");
    } catch (err) {
        res.status(500).send(err);
    }
});


// ➤ Delete Book
router.delete("/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.send("Book Deleted Successfully");
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;