const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();

// 🔹 Add employee
router.post('/employees', async (req, res) => {
  try {
    const emp = new Employee(req.body);
    await emp.save();
    res.status(201).json(emp);
  } catch (err) {
    res.status(400).json({ error: 'Error adding employee' });
  }
});

// 🔹 Get all employees
router.get('/employees', async (req, res) => {
  try {
    const data = await Employee.find();
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching employees' });
  }
});

// 🔹 Update employee
router.put('/employees/:id', async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Error updating employee' });
  }
});

// 🔹 Delete employee
router.delete('/employees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting employee' });
  }
});

module.exports = router;