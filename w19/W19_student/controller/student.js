const Student = require('../models/student');

/* Insert sample students */
exports.insertStudents = async (req, res) => {
  try {
    await Student.insertMany([
      { Name: 'ABC', Roll_No: 111, WAD_Marks: 25, DSBDA_Marks: 25, CNS_Marks: 25, CC_Marks: 25, AI_marks: 25 },
      { Name: 'DEF', Roll_No: 112, WAD_Marks: 30, DSBDA_Marks: 28, CNS_Marks: 26, CC_Marks: 27, AI_marks: 29 },
      { Name: 'GHI', Roll_No: 113, WAD_Marks: 15, DSBDA_Marks: 22, CNS_Marks: 35, CC_Marks: 40, AI_marks: 18 },
      { Name: 'JKL', Roll_No: 114, WAD_Marks: 45, DSBDA_Marks: 45, CNS_Marks: 46, CC_Marks: 42, AI_marks: 44 },
      { Name: 'MNO', Roll_No: 115, WAD_Marks: 38, DSBDA_Marks: 18, CNS_Marks: 36, CC_Marks: 30, AI_marks: 32 }
    ]);

    res.send('5 Students Inserted');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Count + All Students */
exports.getAll = async (req, res) => {
  const data = await Student.find();
  const count = await Student.countDocuments();
  res.json({ TotalStudents: count, Students: data });
};

/* Students with DSBDA > 20 */
exports.dsbdaAbove = async (req, res) => {
  const data = await Student.find({ DSBDA_Marks: { $gt: 20 } }, { Name: 1, _id: 0 });
  res.json(data);
};

/* Add a new student */
exports.addStudent = async (req, res) => {
  try {
    await Student.create(req.body);
    res.send('New Student Added');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Update marks of specified student(s) by +10 (by Roll_No) */
exports.updateMarksByRoll = async (req, res) => {
  try {
    const roll = Number(req.params.roll);
    await Student.updateOne({ Roll_No: roll }, {
      $inc: {
        WAD_Marks: 10,
        DSBDA_Marks: 10,
        CNS_Marks: 10,
        CC_Marks: 10,
        AI_marks: 10
      }
    });
    res.send('Updated marks by +10 for roll ' + roll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Names with >25 in all subjects */
exports.above25All = async (req, res) => {
  const data = await Student.find({
    WAD_Marks: { $gt: 25 },
    DSBDA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    AI_marks: { $gt: 25 }
  }, { Name: 1, _id: 0 });

  res.json(data);
};

/* Names with <40 in both WAD and CNS (treating as Maths and Science) */
exports.lessThan40Both = async (req, res) => {
  const data = await Student.find({
    WAD_Marks: { $lt: 40 },
    CNS_Marks: { $lt: 40 }
  }, { Name: 1, _id: 0 });

  res.json(data);
};

/* Remove specified student by Roll_No */
exports.deleteStudent = async (req, res) => {
  const roll = Number(req.params.roll);
  await Student.deleteOne({ Roll_No: roll });
  res.send('Student with roll ' + roll + ' deleted');
};

/* Table view in browser */
exports.table = async (req, res) => {
  const data = await Student.find();

  let output = `
  <table border="1" cellpadding="8">
    <tr>
      <th>Name</th>
      <th>Roll No</th>
      <th>WAD</th>
      <th>DSBDA</th>
      <th>CNS</th>
      <th>CC</th>
      <th>AI</th>
    </tr>
  `;

  data.forEach(s => {
    output += `
      <tr>
        <td>${s.Name}</td>
        <td>${s.Roll_No}</td>
        <td>${s.WAD_Marks}</td>
        <td>${s.DSBDA_Marks}</td>
        <td>${s.CNS_Marks}</td>
        <td>${s.CC_Marks}</td>
        <td>${s.AI_marks}</td>
      </tr>
    `;
  });

  output += '</table>';
  res.send(output);
};
