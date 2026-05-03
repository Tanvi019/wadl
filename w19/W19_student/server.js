const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const dbconfig = require('./dbconfig/dbconfig');
const studentRoutes = require('./routes/student');

dbconfig();

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3001, () => {
  console.log('W19_student Server running on port 3001');
});
