var passport = require('passport');
var PocketStrategy = require('passport-pocket');
var config = require('../../config/environment');

// Passport Set serializers
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

exports.setup = function (User, config) {
  passport.use(new PocketStrategy({
      consumerKey    : config.pocket.clientSecret,
      callbackURL    : config.pocket.callbackURL
    },
    function (username, accessToken, done) {
      User.findOne({
        'pocket.username': username
      }, function(err, user) {
        if (!user) {
          user = new User({
            username: username,
            provider: 'pocket',
            pocket: {
              username: username,
              accessToken: accessToken
            }
          });
          user.save(function(err) {
            if (err) done(err);
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });

    }
  ));
};
