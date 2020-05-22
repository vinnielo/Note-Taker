const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8080;


// express functions
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
app.get("/api/notes", function(req, res) {
  fs.readFile("./db/db.json",(err, data) => {
    console.log("data", JSON.parse(data))
    res.json(JSON.parse(data));
  });
});

// need to be able to add a note
app.post("/api/notes", function(req, res) {
  const addNote = req.body; 
  // need to add 1 to the id. id cant start at 0 i will not have access to the file its id number is 0
  fs.readFile("./db/db.json", (err, data) => {
    const parsedArray = JSON.parse(data);
    parsedArray.push(addNote);
    idArray = parsedArray.map((note, index) => {
      note.id = index +1;
    });

    let stringify = JSON.stringify(parsedArray);

    fs.writeFile("./db/db.json", stringify, err => {
      if (err) throw err;
    });
    res.json(parsedArray);
  });
}); 

// need to be able to delete the note

app.delete("/api/notes/:id", function(req, res) {
  // ID is stored in db.json  
  const deleteId = parseInt(req.params.id);
  // read and parse db.json
  const dbNotes = JSON.parse(fs.readFileSync("./db/db.json"));
  const filterId = dbNotes.filter(note => note.id !== deleteId);
  // stringify notes
  const stringifiedNotes = JSON.stringify(filterId);
  // write the stringified notes to page
  fs.writeFile("./db/db.json", stringifiedNotes, (err, data) => {
    if (err) throw err;
  });

  res.json(filterId);
});


// api routes

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// starts port listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});