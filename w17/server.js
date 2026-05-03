const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve frontend
app.use(express.static('public'));

// API endpoint
app.get('/api/employees', (req, res) => {
    const filePath = path.join(__dirname, 'employees.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading data' });
        }

        const employees = JSON.parse(data);
        res.json(employees);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});