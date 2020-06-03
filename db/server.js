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