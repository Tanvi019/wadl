const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    roll: Number,
    name: String,
    marks: Number
});

module.exports = mongoose.model('Student', studentSchema);