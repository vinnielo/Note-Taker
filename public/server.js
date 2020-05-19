const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// API calls

app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      const json = JSON.parse(data);
      console.log("data", json);
      res.json(json);
    });
  });


// add new note
app.post("/api/notes", function(req, res) {
    console.log(req.body);
    const newNote = req.body;
    // const parsedNote = JSON.stringify(newNote)
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      const parsedArray = JSON.parse(data);
      console.log(parsedArray);
      parsedArray.push(newNote);
      console.log("PUSHED");
      idArray = parsedArray.map((note, index) => {
        note.id = index;
      });
      const stringArray = JSON.stringify(parsedArray);
  
      fs.writeFile("./db/db.json", stringArray, "utf-8", err => {
        if (err) throw err;
        console.log("writing");
      });
      res.json(parsedArray);
    });
  });