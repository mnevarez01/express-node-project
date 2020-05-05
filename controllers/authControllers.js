module.exports = {
  signup: function (req, res) {
    // if user is logged in, redirect to /dashboard
    if (req.user) {
      req.flash('successMsg', 'You\'re already logged in');
      return res.redirect('/dashboard');
    }

    res.render('signup');
  },
  login: function (req, res) {
    // if user is logged in, redirect to /dashboard
    if (req.user) {
      req.flash('successMsg', 'You\'re already logged in');
      return res.redirect('/dashboard');
    }

    res.render('login');
  },
  dashboard: function (req, res) {
    res.render('dashboard', {
      email: req.user.email,
      user: JSON.stringify(req.user, null, 2)
    });
  },
  logout: function (req, res) {
    req.logout();
    req.flash('successMsg', 'You successfully logged out');
    res.redirect('/');
  }
};