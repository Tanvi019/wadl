const express = require("express");
const router = express.Router();
const Song = require("../models/Song");


// ➤ Insert 5 Songs (STATIC DATA)
router.get("/seed", async (req, res) => {
    await Song.deleteMany();

    const songs = [
        { Songname: "Tum Hi Ho", Film: "Aashiqui 2", Music_director: "Mithoon", singer: "Arijit Singh" },
        { Songname: "Kesariya", Film: "Brahmastra", Music_director: "Pritam", singer: "Arijit Singh" },
        { Songname: "Kal Ho Na Ho", Film: "KHNH", Music_director: "Shankar", singer: "Sonu Nigam" },
        { Songname: "Malang", Film: "Malang", Music_director: "Mithoon", singer: "Ved Sharma" },
        { Songname: "Ghungroo", Film: "War", Music_director: "Vishal", singer: "Arijit Singh" }
    ];

    await Song.insertMany(songs);
    res.send("5 Songs Inserted");
});


// ➤ Count + All Songs
router.get("/", async (req, res) => {
    const songs = await Song.find();
    const count = await Song.countDocuments();

    res.json({ count, songs });
});


// ➤ Songs by Music Director
router.get("/director/:name", async (req, res) => {
    const songs = await Song.find({ Music_director: req.params.name });
    res.json(songs);
});


// ➤ Songs by Director + Singer
router.get("/director/:director/singer/:singer", async (req, res) => {
    const songs = await Song.find({
        Music_director: req.params.director,
        singer: req.params.singer
    });
    res.json(songs);
});


// ➤ Delete Song
router.delete("/:id", async (req, res) => {
    await Song.findByIdAndDelete(req.params.id);
    res.send("Song Deleted");
});


// ➤ Add New Song
router.post("/", async (req, res) => {
    const song = new Song(req.body);
    await song.save();
    res.send("Song Added");
});


// ➤ Songs by Singer + Film
router.get("/singer/:singer/film/:film", async (req, res) => {
    const songs = await Song.find({
        singer: req.params.singer,
        Film: req.params.film
    });
    res.json(songs);
});


// ➤ Update Actor & Actress
router.put("/:id", async (req, res) => {
    await Song.findByIdAndUpdate(req.params.id, {
        Actor: req.body.Actor,
        Actress: req.body.Actress
    });
    res.send("Updated Actor & Actress");
});

module.exports = router;