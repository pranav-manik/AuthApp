var express = require('express');
var router = express.Router();
var User = require('../models/user');

//Get route for reading data
router.get('/',function(req, res, next) {
	return res.sendFile(path.join(__dirname + '/views/index.html'));
});

router.post('/', function(req, res, next) {
	if (req.body.email &&
		req.body.password) {
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
} else if (req.body.logemail && req.body.logpassword) {
	console.log("Else If statement called");
	User.authenticate(req.body.email, req.body.password, function(error, user) {
		if (error || !user) {
			var err = new Error('Wrong email or password.');
			err.status = 401;
			return next(err);
		} else {
			req.session.userId = user._id;
			return res.direct('/profile');
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
          return res.send('<center><h2>Mail: </h2>' + user.email + '<br><p>Welcome to the club kid</p><br><a type="button" href="/logout">Logout</a></center>')
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


module.exports = router;