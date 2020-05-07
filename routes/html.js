// Requiring path to so we can use relative routes to our HTML files
var db = require('../models');


// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require('../config/middleware/isLoggedIn');

module.exports = function (app) {

  app.get('/', function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect('/brewery');
    }
    res.render('home', { className: 'login' });
  });

  app.get('/login', function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/brewery');
    }
    res.render('login.pug', {
      className: 'login'
    });
  });
  app.get('/signup', function (req, res) {
    res.render('signup', { className: 'login' });
  });
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/brewery', function (req, res) {
    db.Brewery.findAll({ raw: true }).then(function (brewery) {
      res.render('brewery.pug', { breweries: brewery, className: 'login' });
    });
    // will need to make a db call to get the user data...pass that data into the template

  });


  app.get('/beers', function (req, res) {
    db.Beer.findAll({ raw: true }).then(function (beer) {
      res.render('beer.pug', { beers: beer, className: 'login' });
    });
  });
  app.get('/brewery/add', isAuthenticated, function (req, res) {
    res.render('addBrewery', { className: 'current' });
  });
  app.get('/beers/add', isAuthenticated, function (req, res) {
    res.render('addBeer', { className: 'current' });
  });

  app.get('/users/:id', isAuthenticated, function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Brewery]
    }).then(User => {
      res.json(User);
    });
  });


  app.get('/brewery/detail', isAuthenticated, function (req, res) {
    db.Beers.findAll({
      where: {
        UserId: brewery.id
      }

    }).then(
      res.render('breweryDetail', { className: 'current' }));
  });
};
