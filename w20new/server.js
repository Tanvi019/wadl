const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = 3000;

// ================= MIDDLEWARE =================
app.use(express.json()); // replace body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ================= DATABASE =================
mongoose.connect('mongodb://127.0.0.1:27017/employeeDB')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

// ================= ROUTES =================
app.use('/api', employeeRoutes);

// 🔹 Extra simple route (for exam/demo)
const Employee = require('./models/Employee');

app.get('/employees', async (req, res) => {
  const data = await Employee.find();
  res.json(data);
});

// 🔹 Delete using GET (exam friendly)
app.get('/delete/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.send("Employee Deleted");
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});