const httpStatus = require('http-status');
const { ValidationError } = require('express-validation');
const APIError = require("../../utils/APIError")
const vars = require('../../config/vars');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res, next) => {
    console.log("🚀 ~ handler err", err)
    let response = {
        code: err.status || err.code || 500,
        message: err.message || '',
        errors: err.errors || httpStatus[err.status],
        stack: err.stack || '',
    }
    if(vars.env !== 'development') delete response.stack;

    res.status(err.status || err.code || 500).json(response);

}
exports.handler = handler;

exports.converter = (err, req, res, next) => {
    let convertError = err;
    if (!(err instanceof APIError)) {
        convertError = new APIError({
            message: err.message,
            errors: err.errors ?? [
                {
                    "type": "server_error",
                    "message": "Unknown error"
                }
            ],
            stack: err.stack,
        })
    }

    handler(convertError, req, res)
}
/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res, next) => {
    const err = new APIError({
        message: 'Not found',
        status: httpStatus.NOT_FOUND,
    });
    return handler(err, req, res);
};

/**
 * caller function for global error handling.
 * ref: https://www.youtube.com/watch?v=s5YoXms0ECs&t=474s
 */
exports.use = fn => (req, res, next) =>
    Promise.resolve(fn(req,res,next)).catch(next);
