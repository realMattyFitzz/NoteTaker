const logger = require("morgan");
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

let app = express();
let PORT = process.env.PORT || 8080;
let savedNotes = []
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(express.static("public"));
app.get("/api/notes", function(req,res){
  savedNotes = fs.readFile(__dirname + "/db/db.json", "utf8", function(err, data){
    res.json(JSON.parse(data));
  });
});
app.post("/api/notes", function(req,res){
  const note = req.body;
  note.id = (uuidv4());
  fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data){
    const savedNotes = JSON.parse(data);
    savedNotes.push(note);
    const stringified = JSON.stringify(savedNotes, null, 2);
    fs.writeFile(__dirname + "/db/db.json", stringified, function () {
      res.json(note)
    })
  })
})

app.delete("/api/notes/:id", function (req,res){
  const {id} = req.params;
  fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data){
    let savedNotes = JSON.parse(data);
    savedNotes = savedNotes.filter((savedNote) => savedNote.id !== id);
    const filteredNotes = JSON.stringify(savedNotes, null, 2);
    fs.writeFile(__dirname + "/db/db.json", filteredNotes, function () {
      res.json(true);
    })
  })

})

app.get("/notes", function(req,res){
  res.sendFile(path.join(__dirname + "/public/notes.html"))
});

app.get("*", function (req,res) {
    res.sendFile(__dirname + "/public/index.html")
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);