const express = require("express");
const path = require("path");
const fs = require("fs");

const uuid = require("./helpers/uuid");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/db/db.json"))
);

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuid();
  console.log(newNote);
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
    });
  });
  res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.splice(id, 1);
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
    });
  });
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
