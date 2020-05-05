// Requiring path to so we can use relative routes to our HTML files
var path = require('path');
var db = require('../models');


// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require('../config/middleware/isLoggedIn');

module.exports = function (app) {

  app.get('/', function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/brewery');
    }
    res.render('signup.pug');
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

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/brewery', function (req, res) {
    db.Brewery.findAll().then(brewery => {
      res.render('brewery.pug', { breweries: brewery });
    })
    // will need to make a db call to get the user data...pass that data into the template

  });
  app.get('/beers', function (req, res) {
    db.Beer.findAll().then(beer => {
      res.render('beer.pug', { beers: beer });
    })
  });
  app.get('/brewery/add', isAuthenticated, function (req, res) {
    res.render('addBrewery')
  })
  app.get('/beers/add', isAuthenticated, function (req, res) {
    res.render('addBeer')

  })

};
