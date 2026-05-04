const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const bookRoutes = require('./routes/bookRoutes');
const Book = require('./models/Book');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/bookstoreDB')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes (API)
app.use('/api/books', bookRoutes);

// 🔹 Simple route (exam friendly)
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// 🔹 Delete via GET (exam demo)
app.get('/delete/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.send("Book Deleted");
});


app.get('/add-book', async (req, res) => {
  const Book = require('./models/Book');

  await Book.create({
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
    genre: "Self-help"
  });

  res.send("Book Added");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});