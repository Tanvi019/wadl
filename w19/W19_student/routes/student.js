const express = require('express');
const router = express.Router();

const studentController = require('../controller/student');

router.get('/insert', studentController.insertStudents);
router.get('/all', studentController.getAll);
router.post('/add', studentController.addStudent);
router.get('/dsbda/above20', studentController.dsbdaAbove);
router.put('/update/:roll', studentController.updateMarksByRoll);
router.get('/above25/all', studentController.above25All);
router.get('/lessthan40/both', studentController.lessThan40Both);
router.delete('/delete/:roll', studentController.deleteStudent);
router.get('/table', studentController.table);

module.exports = router;
