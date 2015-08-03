var express = require('express');
var app = express();

app.set('view engine', 'ejs');

// call 'next' for middlewares that are part of the chain
/*app.use(function (req, res, next) {
  console.log('Request at ' + new Date().toISOSting());
  next();
});*/

app.use(express.static('public'));

//////route, callback
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/pizza/:topping/:qty', function (req, res) {
  var obj = req.params;
  obj.title = 'Pizza Shop';
  res.render('templates/pizza', req.params);
});

app.get('/hello', function (req, res) {
  res.send('Hello!');
});

app.get('/awesomethings', function (req, res) {
  setTimeout(function () {

    var awesomeThings = [
      'pizza',
      'randy savage',
      'buddy',
    ];

    res.render('templates/world',
      { title: 'awesomesite.com',
        welcome: 'thanks for coming!',
        awesomeThings: awesomeThings
      }
    );
  }), 5000;
});

app.get('/test', function (req, res, next) {
  res.write('test1');
  next();
});

app.get('/test', function (req, res) {
  res.end('test2');
});

app.get('/json', function (req, res) {
  res.send({an: 'object'});
});

app.get('/thisshoulderror', function (req, res) {
  res.send(badVariable);
});

app.use(function (req, res) {
  res.status(403).send('Unauthorized!');
});

app.use(function (err, req, res, next) {
  // pass 4 arguments to create error handling middleware
  console.log('ERRRRRR!', err.stack);
  res.status(500).send('My Bad');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
// %s:%s takes a string value in order. host and port replace the %s's
  console.log('Example app listening at http://%s:%s', host, port);
});

// express allows chaining .get startments for routing,
// instead of several if else statements.

// at its core, express is a routing engine.

// want logging functions early in the chain

// Errors should be 400's before 500's
