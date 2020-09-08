
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const path = require("path")
const PORT = 8080
const fs = require("fs")

const rootObj = {root: __dirname + "/public"};

app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => res.sendFile("./index.html", rootObj));
app.get('/notes', (req, res) => res.sendFile("./notes.html", rootObj));

app.get('/api/notes', (req, res) => {
    console.log("/api/notesget")
    let json = getJson();
    console.log(json);
    res.json(json);
})

app.post('/api/notes', (req, res) => {
    console.log('/api/notespost')
    console.log(req.body);
    addNoteToJSON(req.body)
    res.json(getJson());
})

app.delete('/api/notes:id', (req,res) => {
    console.log('api/notes/:delete')
    deleteNameFromJSON(req.param.id);
    res.json(getJson());
})

app.listen(PORT, () => console.log(`example app listening a http://localhost:${PORT}`))


function getJson() {
    let data = fs.readFileSync(__dirname + '/db.db.json');
    let json = JSON.parse(data);
    return json; 
}

function createNoteObject(data) {
    let obj = {title: data.title,
        text: data.text,
        complete: false,
        hidden: false}
        return obj
}


function addNoteToJSON(note) {
    let json = getJson();
    let newNote = createNote
}

function saveJSON(jsonData) {
    let data = JSON.stringify(jsonData);
    fs.writeFileSync(__dirname + '/db/db.json', data);

}

function selectNoteFromJSON(id) {
    let json = getJson();
    json(id).hide = true
    saveJSON(json);
}