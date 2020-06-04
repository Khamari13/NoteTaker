const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs");
const PORT = process.env.PORT || 8080;
const savedNotes = require("./db/db.json");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
//html route
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})
//api routes
app.get('/api/notes', function (req, res) {
    return res.json(savedNotes)
})
app.delete('/api/notes/:id', function (req, res) {
    let uniqId = parseInt(req.params.id)
    let uniqArr = savedNotes.filter(function(newNote){
        newNote.id !== uniqId
    })
    fs.writeFile("./db/db.json", JSON.stringify(uniqArr), err =>{
        if (err) console.log(err)
        res.send(savedNotes)
      })
})
//api post request
app.post('/api/notes', function (req, res) {
    let clientNote = req.body;
    clientNote.id = savedNotes.length +1
    savedNotes.push(clientNote)
    fs.writeFile("./db/db.json", JSON.stringify(savedNotes), err =>{
        if (err) console.log(err)
        res.send(savedNotes)
      })
})
//Port Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });



