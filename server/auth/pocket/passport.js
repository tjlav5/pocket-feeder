var passport = require('passport');
var PocketStrategy = require('passport-pocket');

// Passport Set serializers
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

exports.setup = function (User, config) {
  console.log('checking pocket');
  passport.use(new PocketStrategy({
      consumerKey: config.pocket.clientID,
      callbackURL: config.pocket.callbackURL
    },
    function (username, accessToken, done) {
      console.log(username);
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
