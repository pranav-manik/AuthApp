var express = require('express');
var router = express.Router();
var User = require('../models/user');

//Get route for reading data
router.get('/',function(req, res, next) {
	return res.sendFile(path.join(__dirname + '/views/index.html'));
});

router.post('/', function(req, res, next) {
	if (req.body.email && req.body.password && req.body.SignUpBtn=="SignUp") {
		var userData = {
			email: req.body.email,
			password: req.body.password,
		}
		User.create(userData, function(err, user) {
		  if (err) {
			return next(err);
		  }
		  else {
		  	req.session.userId = user._id;
			return res.redirect('/profile');
		  }
		});
} else if (req.body.email && req.body.password  && req.body.LoginBtn=="Login") {
	User.authenticate(req.body.email, req.body.password, function(error, user) {
		if (error || !user) {
			return res.redirect('/wrongpass');
		} else {
			req.session.userId = user._id;
			return res.redirect('/profile');
		}
	});
} else {
	var err = new Error('fields missing.');
	err.status = 400;
	return next(err);
}
})


// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('unauthorized, Go back');
          err.status = 400;
          return next(err);
        } else {
        	//'<body style="background-color:#0C1832"><center><h2>Mail: </h2>' + user.email + '<br><p>Welcome to the club kid</p><br><a type="button" href="/logout">Logout</a></center></body>')
          return res.send('<body style="background-color:#65D9F5"><center><h2>Mail: </h2>' + user.email + '<br><p>Welcome to the club kid</p><br><a class="btn" href="/logout"><button>Logout</button></a></center></body>')
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

//If password or email is wrong
router.get('/wrongpass', function (req, res, next ) {
	return res.send('<body style="background-color:#65D9F5"><center><p>Wrong Email or Password</p><br><a class="btn" href="/"><button>Go Back</button></a></center></body>');
});

module.exports = router;