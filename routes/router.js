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
			return res.redirect('/profile');
		  }
	});
}
})
module.exports = router;