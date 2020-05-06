// Requiring necessary npm packages
var express = require('express');
var session = require('express-session');
// Requiring passport as we've configured it
var passport = require('./config/passport');
// var pug = require('pug');
var path = require('path');

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require('./models');

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use(express.static('public/img'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



// We need to use sessions to keep track of our user's login status
app.use(session({ secret: 'mouse rat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
app.use(function (req, res, next) {
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
});
require('./routes/html.js')(app);
require('./routes/api.js')(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log('==> Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  });
});
