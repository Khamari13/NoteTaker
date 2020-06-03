const express = reuire("express");
const app = express();
const path = require('path');

const PORT = process.env.PORT || 8080;

app.use(express.urlencode({ extended: true }));
app.use(express.json());

const fs = require("fs");


fs.writefile(
    "db.json",
    JSON.stringify(notes), 
    (err) => {
        if(err) {
            throw err;
        }
    }
)

fs.readfile(
    "db.json",
    (err, results) => {
        if(err) {
            throw err;
        }else {
            notes = JSON.parse
        }
    }
)


