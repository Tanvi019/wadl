const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// ➡ Add Book
router.post('/', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: 'Error adding book' });
  }
});

// ➡ Get All Books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// ➡ Update Book
router.put('/:id', async (req, res) => {
  const updated = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// ➡ Delete Book
router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});

module.exports = router;