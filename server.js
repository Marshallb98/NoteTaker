const express = require("express")
const path = require("path")
var fs = require("fs")
const PORT = process.env.PORT || 3030
const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get("/api/notes", function (req, res) {
    return res.json(notes)
})

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT)
})