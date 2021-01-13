var express = require("express");
var path = require("path");
const fs = require("fs");
var PORT = process.env.PORT || 3030;
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const notesDB = './db/db.json';

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

app.post("/api/notes", function (req, res) {
    let postNote = req.body
    postNote.id = Math.floor(Math.random() * 10000)
    notesDB.push(postNote)
    return res.json(notesDB)
});
app.delete("/api/notes/:id", function (req, res) {
    console.log(notesDB)
    var noteToRemove = req.params.id
    notesDB = notesDB.filter(function (data) {
        return data.id != noteToRemove
    });
    let updatedNotes = JSON.stringify(notesDB)
    fs.writeFile("./db/db.json", updatedNotes, err => {
        if (err) throw err
        else {
            return res.json(updatedNotes)
        }
    });
});
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT)
});