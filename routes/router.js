var express = require('express');
var router = express.Router();
var User = require('../models/User');

//Get route for reading data
router.get('/',function(req, res, next) {
	return res.sendFile(path.join(__dirname + '/views/index.html'));
});

router.post('/', function(req, res, next) {

	if (req.body.password !== req.body.passwordRepeat) {
		var err = new Error('Passwords don\'t match');
		err.status = 400;
		res.send("passwords don't match");
		return next(err);
	}
});

if (req.body.email &&
	req.body.password &&
	req.body.passwordRepeat) {
	var userData = {
		email: req.body.email,
		password: req.body.password,
		passwordRepeat: req.body.passwordRepeat,
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