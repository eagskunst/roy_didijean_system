const passport = require('passport');
const jwtStrategy = require('./strategies/jwt.strategies');
const LocalStrategy = require('./strategies/local.strategies');

passport.use(jwtStrategy)
passport.use(LocalStrategy)
