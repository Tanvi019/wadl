const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
//const PORT = 3000;

// Serve frontend
app.use(express.static('public'));

// API endpoint
app.get('/api/products', (req, res) => {
    const filePath = path.join(__dirname, 'products.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading products' });
        }

        const products = JSON.parse(data);
        res.json(products);
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});