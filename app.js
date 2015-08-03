// npm requires
var express = require('express');

//
var routes = require('./routes/index');
var pizza = require('./routes/pizza');

// variables
var app = express();

// settings
app.set('view engine', 'ejs');
app.set('case sensitive routing', true);

app.locals.title = 'Kewl';

// middlewares
/*app.use(function (req, res, next) {
  console.log('Request at ' + new Date().toISOSting());
  next();
});*/

app.use(express.static('public'));

// routes
app.use('/', routes);
app.use('/pizza', pizza);

// errors
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

// locals are like global constants that are available everywhere.
