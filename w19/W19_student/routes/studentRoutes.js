const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// ✅ GET all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ GET single student
router.get('/:roll', async (req, res) => {
    try {
        const student = await Student.findOne({ roll: req.params.roll });
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ POST add student
router.post('/', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.json({ message: "Student added", data: student });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ PUT update student
router.put('/:roll', async (req, res) => {
    try {
        const updated = await Student.findOneAndUpdate(
            { roll: req.params.roll },
            req.body,
            { new: true }
        );
        res.json({ message: "Updated", data: updated });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ DELETE student
router.delete('/:roll', async (req, res) => {
    try {
        await Student.findOneAndDelete({ roll: req.params.roll });
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;