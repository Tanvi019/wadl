const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");


// ➤ Add Employee
router.post("/", async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.send("Employee Added Successfully");
    } catch (err) {
        res.status(500).send(err);
    }
});


// ➤ View All Employees
router.get("/", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).send(err);
    }
});


// ➤ Update Employee
router.put("/:id", async (req, res) => {
    try {
        await Employee.findByIdAndUpdate(req.params.id, req.body);
        res.send("Employee Updated Successfully");
    } catch (err) {
        res.status(500).send(err);
    }
});


// ➤ Delete Employee
router.delete("/:id", async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.send("Employee Deleted Successfully");
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;