const mongoose = require('mongoose');

function dbconfig() {
  mongoose.connect('mongodb://localhost:27017/student')
    .then(() => { console.log('Connected to MongoDB (student)') })
    .catch((err) => { console.error('Error connecting to MongoDB', err) });
}

module.exports = dbconfig;
