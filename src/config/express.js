const express = require('express');
const app = express();
const methodOverride = require('method-override')
const error = require('../app/middlewares/error');
const auth = require('../app/middlewares/auth');
const { validationResult } = require('express-validator');
const util = require('util');
const passport = require('passport');
const jwtStrategy = require('./passport');
const router = express.Router();

//HTTP request logger middleware for node.js
const morgan = require('morgan');
app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 300 }
}));

//this middleware is to get value for normal form subumit
app.use(express.urlencoded({ extended: true }));
//this middleware is to get value for ajax form subumit
app.use(express.json());
//serves static assets
app.use(express.static(`${__dirname}/public`));

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride('_method'));

//authentication.
// app.use(auth.validatePlayer);
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

//express-validator: Extracts the validation errors from a request.
app.use((req, res, next) => {
    req.validateRequest = function () {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            error.handler({
                code: 422,
                message: 'validation failed!',
                errors: errors.array()
            }, req, res, next)
        }
        else {
            return true;
        }
    }
    next();
});

//Request routing.
const modules = ['authentication', 'homeTutorial'];
modules.forEach((moduleName) => {
    const route = require(`../modules/${moduleName}/routes`);
    app.use(`/api/${moduleName}`, route);
});

//Exception handling.
app.use(error.converter);

// catch 404 and forward to error handler (404 error only goes to middleware that has params: req, res, next)
app.use(error.notFound);

module.exports = app;

