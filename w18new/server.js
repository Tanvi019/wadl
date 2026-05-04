// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// ================= MIDDLEWARE =================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ================= DATABASE =================
mongoose.connect('mongodb://127.0.0.1:27017/music')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ================= SCHEMA =================
const songSchema = new mongoose.Schema({
  Song_Name: { type: String, unique: true },
  Film_Name: String,
  Music_Director: String,
  Singer: String,
  Actor: String,
  Actress: String
});

const Song = mongoose.model('songdetails', songSchema);

// ================= ROUTES =================

// 🔹 (c) Insert initial songs
app.get('/insert', async (req, res) => {
  await Song.insertMany([
    { Song_Name: 'Kal Ho Na Ho', Film_Name: 'Kal Ho Na Ho', Music_Director: 'Shankar-Ehsaan-Loy', Singer: 'Sonu Nigam' },
    { Song_Name: 'Tum Hi Ho', Film_Name: 'Aashiqui 2', Music_Director: 'Mithoon', Singer: 'Arijit Singh' },
    { Song_Name: 'Zinda', Film_Name: 'Bhaag Milkha Bhaag', Music_Director: 'Shankar-Ehsaan-Loy', Singer: 'Siddharth Mahadevan' },
    { Song_Name: 'Kun Faya Kun', Film_Name: 'Rockstar', Music_Director: 'A. R. Rahman', Singer: 'Mohit Chauhan' },
    { Song_Name: 'Tera Ban Jaunga', Film_Name: 'Kabir Singh', Music_Director: 'Akhil Sachdeva', Singer: 'Akhil Sachdeva' }
  ]);

  res.send("Songs Inserted");
});

// 🔹 (d) Display all + count
app.get('/songs', async (req, res) => {
  const songs = await Song.find();
  const count = await Song.countDocuments();

  res.json({
    total: count,
    data: songs
  });
});

// 🔹 (e) Songs by Music Director
app.get('/director/:name', async (req, res) => {
  const data = await Song.find({ Music_Director: req.params.name });
  res.json(data);
});

// 🔹 (f) Songs by Music Director + Singer
app.get('/director-singer', async (req, res) => {
  const { director, singer } = req.query;

  const data = await Song.find({
    Music_Director: director,
    Singer: singer
  });

  res.json(data);
});

// 🔹 (g) Delete song
app.get('/delete/:song', async (req, res) => {
  await Song.deleteOne({ Song_Name: req.params.song });
  res.send("Song Deleted");
});

// 🔹 (h) Add new song
app.get('/add', async (req, res) => {
  const { Song_Name, Film_Name, Music_Director, Singer, Actor = '', Actress = '' } = req.query;

  if (!Song_Name || !Film_Name || !Music_Director || !Singer) {
    return res.send("Missing fields");
  }

  const newSong = new Song({
    Song_Name,
    Film_Name,
    Music_Director,
    Singer,
    Actor,
    Actress
  });

  await newSong.save();
  res.send("Song Added");
});

// 🔹 (i) Songs by Singer + Film
app.get('/singer-film', async (req, res) => {
  const { singer, film } = req.query;

  const data = await Song.find({
    Singer: singer,
    Film_Name: film
  });

  res.json(data);
});

// 🔹 (j) Update Actor & Actress
app.get('/update/:song', async (req, res) => {
  const { actor, actress } = req.query;

  await Song.updateOne(
    { Song_Name: req.params.song },
    { Actor: actor, Actress: actress }
  );

  res.send("Updated Actor & Actress");
});

// ================= SERVER =================
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});