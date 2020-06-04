const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs");
const PORT = process.env.PORT || 3500;
const savedNotes = require("./db/db.json");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
//html route
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})
// api routes
app.get('/api/notes', function (req, res) {
    return res.json(savedNotes)
})
app.delete('/api/notes/:id', function (req, res) {
    let uniqId = parseInt(req.params.id)
    let uniqArr = savedNotes.filter(newNote => newNote.id !== uniqId)
    fs.writeFile("./db/db.json", JSON.stringify(uniqArr), function(err) {
        if (err) console.log(err)
        res.end()
      })
})
//api post request
app.post('/api/notes', function (req, res) {
    const clientNote = req.body;
    clientNote.id = savedNotes.length +1
    savedNotes.push(clientNote)
    fs.writeFile("./db/db.json", JSON.stringify(savedNotes), function(err) {
        if (err) console.log(err)
        res.end()
      })
})
//port listener
app.listen(PORT, function() {
    console.log("App listening on PORT:" + PORT);
});