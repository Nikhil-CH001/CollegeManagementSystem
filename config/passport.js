const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { db } = require("../config/database");
const User = db.users;



passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  const [user] = await User.findOrCreate({
    where: { email: profile.emails[0].value },
    defaults: {
      username: profile.displayName,
      password: "oauth" // Dummy placeholder
    }
  });
  done(null, user);
}));

module.exports = passport