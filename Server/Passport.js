const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('./db');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      // Match user
      const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (!user.rows.length) {
        return done(null, false, { message: 'That email is not registered' });
      }

      // Match password
      bcrypt.compare(password, user.rows[0].hashedpassword, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user.rows[0]);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, user.rows[0]);
  });
};
