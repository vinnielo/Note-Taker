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
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    console.log("data", JSON.parse(data));
    res.json(JSON.parse(data));
  });
});

// need to be able to add a note
app.post("/api/notes", function(req, res) {
  const addNote = req.body;
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    const parsedArray = JSON.parse(data);
    parsedArray.push(addNote);
    console.log("added...");
    idArray = parsedArray.map((note, index) => {
      note.id = index;
    });

    JSON.stringify(parsedArray);

    fs.writeFile("./db/db.json", JSON.stringify(parsedArray), err => {
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
  const dbNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
  const filterId = dbNotes.filter(note => note.id !== deleteId);
  // stringify notes
  const stringifiedNotes = JSON.stringify(filterId);
  // write the stringified notes to page
  fs.writeFile("./db/db.json", stringifiedNotes, (err, data) => {
    if (err) throw err;
  });

  res.json(filterId);
});

// need to be able to edit a note

// api routes

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {});
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// starts port listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});