var express = require('express');
var router = express.Router();

var User = require('../models/User');

router.get('/login', function loginUser (req, res) {
  res.render('user/login')
});

router.post('/login', function doLogin (req, res) {
  User.login(req.body, function (err, user) {
    console.log(req);
    req.session.regenerate(function () {
      req.session.userId = user._id;
      res.redirect('/');
      console.log(err, user);
    });
  });
});

router.get('/new', function newUser (req, res) {
  // register page
  res.render('user/new')
});

router.post('/', function createUser (req, res) {
  // perform registration
  console.log(req.body);
  User.create(req.body, function (err) {
    if (err) {
      res.render('user/new', {err: err});
    } else {
    res.redirect('/user/login');
    }
  })
});

module.exports = router;
