const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.serializeUser(function(user,done){
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:     '880320092469-k96sia3b1j3rm1156lo7cq3oams18u1s.apps.googleusercontent.com',
    clientSecret: 'P739ZQrxTu8oY2TnyrJshSkb',
    callbackURL: "http://localhost:5000/auth/google/callback"
  },

  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));