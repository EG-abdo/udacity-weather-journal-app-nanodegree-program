//add empty object to work as endpoint
projectData = {};
//port number to using it in the server
//there 65535 port [0,65534] i will use the last port 
const port = 65534;
//express to run a server
const express = require('express');
const app = express();
// add bodyParser
const bodyParser = require('body-parser');
//configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//add cors
const cors = require('cors')
app.use(cors());
//main folder
app.use(express.static('website'));
// create server
const server = app.listen(port, listening);
//error handling function
function listening(){
    console.log(`server runing in localhost: ${port}`);
};
// post
app.post('/addWeather' , addWeather);
//create add Weather function
function addWeather(req,res){
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;
    res.send(projectData);
    console.log(projectData);
  }
//
app.get('/all', getData)

function getData( req, res)
{
  res.send(projectData);
  console.log(projectData);

}