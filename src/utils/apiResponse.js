const APIError = require('./APIError');
/**
 * @desc    Send any success response
 *
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */
exports.resSuccess = (data = [], message = 'Success', statusCode = 200) => ({
    code: statusCode,
    message,
    data
});

exports.resError = (code, message = '', errors = [], status = 400) => {
    throw new APIError({
        status,
        code,
        message,
        errors
    });
};

exports.resPaginationSuccess = (data, message = 'Success', statusCode = 200) => ({
    code: statusCode,
    message,
    total: data.total,
    // page: data.page,
    // perPage: data.perPage,
    data: data.results
});
