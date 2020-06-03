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
