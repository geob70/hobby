var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy({

  usernameField: 'email',
  passwordField: 'password'
},
  
  
  function (email, password, done) {

  User.findOne({
    email: email
  }, function (err, user) {
    // console.log(user.email);
    if (err) {
      return res.send(err);
    }
    bcrypt.compare(password, user.password, function (err, res) {
      console.log(password);
      if (!res) {
        console.log('incorrect password');
        return done(null, false, {
          message: 'incorrect password'
        });
      }
      return done(null, user);
    });
  });
}));
