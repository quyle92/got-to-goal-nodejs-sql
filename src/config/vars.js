
require('dotenv').config();

module.exports = {
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
}