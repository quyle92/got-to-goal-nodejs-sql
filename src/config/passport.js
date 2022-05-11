const { Strategy, ExtractJwt } = require('passport-jwt');
const vars = require('./vars');
const Player= require('../app/models/Player');

let options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = vars.jwtSecret;

let jwtStrategy =   new Strategy(options, (payload, done) => {
    Player.query().where('email', payload.email).first()
        .then( player => {
            if (player) {
                return done(null, {
                    player: player,
                });
            } else {
                return done(null, false);
            }
        })
        .catch(err => {
            return done(err, false);
        })
});

module.exports = jwtStrategy

//ref: https://hocweb.vn/cach-su-dung-passport-jwt-trong-nodejs/
//https://github.com/mikenicholson/passport-jwt