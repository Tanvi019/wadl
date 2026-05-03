const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/bookstoreDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});