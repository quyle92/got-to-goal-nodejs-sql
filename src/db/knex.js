//https://gist.github.com/NigelEarle/80150ff1c50031e59b872baf0e474977
require('dotenv').config()
const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile.js')[environment];
module.exports = require('knex')(config);