const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt,
    User = require('../model/admin')

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false,
        },
        async (email, password, done) => {
            try {
              const user = await User.getUser(email)
                    if (user === null) {
                        return done(null, false, { message: 'incorrect email or password' });
                    }
                    const isValidPass = await User.validPassword(email,password);
                      if (!isValidPass){
                      return done(null, false, { message: 'incorrect email or password' });
                    }
                    console.log('user found & authenticated');
                    return done(null, user);

                
            } catch (err) {
                done(err);
            }
        },
    ),
);
const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret',
  };
  
  passport.use(
    'jwt',
    new JWTstrategy(opts, (jwt_payload, done) => {
      try {
        User.findUserById(jwt_payload.id).then(user => {

          console.log(jwt_payload.id)
          if (user) {
            console.log('user found in db in passport');
            done(null, user);
          } else {
            console.log('user not found in db');
            done(null, false);
          }
        });
      } catch (err) {
        done(err);
      }
    }),
  );