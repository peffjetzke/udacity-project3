/*Variables*/
let projectData = {};

/*Setup Server*/
const express = require('express');
const app = express();

/*Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

/*bodyParser returns the depreciated warning. Including it instead of express to stay inline with rubric*/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

//point at the correct client folder
app.use(express.static('root'));

/*Start Server w/ callback*/
const port = 8000;
const server = app.listen(port, listening);

function listening(){
  console.log("Server running");
  console.log(`Running on localhost: ${port}`);
}

/*Get*/
// GET method route

function getData(req, res) {
    res.send(projectData);
  }

app.get('/all', getData) 
// /*Post*/
// POST method route
function postData(req, res) {
    let data = req.body;

    projectData["temp"] = data.temp;
    projectData["date"] = data.date;
    projectData["feelings"] = data.feelings;

    res.send(projectData);
    console.log(projectData + "server debug");
  }

  app.post('/add', postData);