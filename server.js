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

//api post request
app.post('/api/notes', function (req, res) {
    const clientNote = req.body;
    clientNote.id = savedNotes.length + 1;

    savedNotes.push(clientNote)
    fs.writefile(
        "db.json",
        JSON.stringify(savedNotes), 
        (err) => {
            if(err) {
                throw err;
            }
            res.sendStatus(202)
        }
    )
})

app.delete('/api/notes/:id', function (req, res) {
    let id = req.params.id
    
    for (let i =0; i < savedNotes; i++) {
        if (id == savedNotes[i].title){
            savedNotes.splice(i, 1)
        }
    }

    fs.writefile(
        "db.json",
        JSON.stringify(savedNotes), 
        (err) => {
            if(err) {
                throw err;
            }
            res.sendStatus(202)
        }
    )
})




// fs.readfile(
//     "db.json",
//     (err, results) => {
//         if(err) {
//             throw err;
//         }else {
//             notes = JSON.parse
//         }
//     }
// )

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });


