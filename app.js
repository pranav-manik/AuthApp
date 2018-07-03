

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/*MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  var dbo = db.db("admin");
  dbo.createCollection("users", function(err, res) {
  	if (err) throw err;
  	console.log('"users" Collection Created');
    db.close();
  });
  
});*/
//connect to MongoDB
mongoose.connect('mongodb://localhost/auth');
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});



//for static site
app.use('/',express.static('views'))

// include routes
var routes = require('./routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});


app.listen(3000, function () {
	console.log('running on port 3000 boiii!');
    });