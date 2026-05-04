// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// ================= MIDDLEWARE =================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve HTML (put your index.html inside /public folder)
app.use(express.static(path.join(__dirname, 'public')));

// ================= DATABASE =================
mongoose.connect('mongodb://127.0.0.1:27017/student')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ================= SCHEMA =================
const studentSchema = new mongoose.Schema({
  Name: String,
  Roll_No: { type: Number, unique: true },
  WAD_Marks: Number,
  CC_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  AI_marks: Number
});

const Student = mongoose.model('studentmarks', studentSchema);

// ================= ROUTES =================

// 🔹 Insert initial data
app.get('/insert', async (req, res) => {
  await Student.insertMany([
    { Name: "Alice", Roll_No: 1, WAD_Marks: 25, CC_Marks: 26, DSBDA_Marks: 30, CNS_Marks: 28, AI_marks: 27 },
    { Name: "Bob", Roll_No: 2, WAD_Marks: 20, CC_Marks: 18, DSBDA_Marks: 15, CNS_Marks: 22, AI_marks: 19 },
    { Name: "Charlie", Roll_No: 3, WAD_Marks: 35, CC_Marks: 36, DSBDA_Marks: 32, CNS_Marks: 34, AI_marks: 33 }
  ]);
  res.send("Data Inserted Successfully");
});

// 🔹 Display all students + count
app.get('/students', async (req, res) => {
  const students = await Student.find();
  const count = await Student.countDocuments();

  res.json({
    total: count,
    data: students
  });
});

// 🔹 Add student (from HTML form)
app.post('/add-student', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json({ message: "Student added successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error adding student", details: err });
  }
});

// 🔹 Query (used by your HTML search form)
app.get('/students-query', async (req, res) => {
  const { subject, condition, marks } = req.query;

  let query = {};
  const m = parseInt(marks);

  if (condition === 'gt') query[subject] = { $gt: m };
  else if (condition === 'lt') query[subject] = { $lt: m };
  else query[subject] = m;

  const data = await Student.find(query);
  res.json(data);
});

// 🔹 DSBDA > 20
app.get('/dsbda-more-20', async (req, res) => {
  const data = await Student.find(
    { DSBDA_Marks: { $gt: 20 } },
    { Name: 1 }
  );
  res.json(data);
});

// 🔹 Update marks (+10)
app.get('/update/:name', async (req, res) => {
  await Student.updateOne(
    { Name: req.params.name },
    {
      $inc: {
        WAD_Marks: 10,
        CC_Marks: 10,
        DSBDA_Marks: 10,
        CNS_Marks: 10,
        AI_marks: 10
      }
    }
  );
  res.send("Marks Updated");
});

// 🔹 All subjects > 25
app.get('/all-subjects-25', async (req, res) => {
  const data = await Student.find({
    WAD_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    DSBDA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    AI_marks: { $gt: 25 }
  }, { Name: 1 });

  res.json(data);
});

// 🔹 Maths & Science < 40 (WAD = Maths, CNS = Science)
app.get('/math-sci-low', async (req, res) => {
  const data = await Student.find({
    WAD_Marks: { $lt: 40 },
    CNS_Marks: { $lt: 40 }
  }, { Name: 1 });

  res.json(data);
});

// 🔹 Delete student
app.get('/delete/:name', async (req, res) => {
  await Student.deleteOne({ Name: req.params.name });
  res.send("Student Deleted");
});

// ================= SERVER =================
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});