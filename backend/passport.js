const passport = require('passport');

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CLIENT_ID = "569741506042-28drdn22fhpj0p060c0c3a3g5u8k3era.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );

  passport.serializeUser((user,done)=>{
    done(null,user)
  })

  passport.deserializeUser((user,done)=>{
    done(null,user)
  })