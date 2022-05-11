const express = require('express');
const app = express();
const APIError = require('../../utils/APIError');
const passport = require('passport');

//ref: https://stackoverflow.com/a/47000427/11297747
module.exports = {
    authorize: () => (req, res, next) =>
        //passport.authenticate is higher order function (click on the function itself and you'll see it).
        passport.authenticate('jwt', { session: false }, (err, payload, info) => {
            // console.log("🚀 ~ payload", payload.player.tutorial_step_passed)
            let error = err || info;
            if (error) {
                let apiError = new APIError({
                    status: error.status ?? 401,
                    message: error.message,
                    stack: error.stack
                });
                return next(apiError);
            }
            req.player = payload.player;

            return next();
        })(req, res, next)
}