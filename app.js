

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var MongoClient = require('mongodb').MongoClient;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
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
mongoose.connect('mongodb://localhost/authApp');
var db = mongoose.connection;

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {});


// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//for static site
app.use('/',express.static('views'))

// include routes
var routes = require('./routes/router');
app.use('/', routes);

// catch 404 error
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

//listen on port
app.listen(3000, function () {
	console.log('running on port 3000 boiii!');
    });