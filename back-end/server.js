require('dotenv').config(); //file contains port number

var express = require('express');
var app = express();
var redditRouter = require('./config/routes.js');
var bodyParser = require('body-parser');

app.use(function(req, res, next) { //this lets front end and back end running in different ports connect with eachother  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//routes can be declared here app.get, app.post etc but in this
app.use(redditRouter); //finds routes in './config/routes.js'

let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`Listening on port ${ port }`);
});
