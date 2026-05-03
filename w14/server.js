const express = require("express");
const fs = require("fs");

const app = express();

// Serve frontend
app.use(express.static("public"));

// API Route
app.get("/api/users", (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }
        res.json(JSON.parse(data));
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});