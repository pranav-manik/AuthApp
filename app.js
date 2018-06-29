

var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  var dbo = db.db("admin");
  dbo.createCollection("users", function(err, res) {
  	if (err) throw err;
  	console.log('"users" Collection Created');
    db.close();
  });
  
});


app.use('/',express.static('views'));
//app.get('/', function (req, res) {
	//res.send('Hello World!');
    //});


app.listen(3000, function () {
	console.log('running on port 3000 boiii!');
    });