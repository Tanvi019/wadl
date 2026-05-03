const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// DB: music
mongoose.connect("mongodb://127.0.0.1:27017/music")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const songRoutes = require("./routes/songRoutes");
app.use("/api/songs", songRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});