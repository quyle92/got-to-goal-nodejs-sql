//https://gist.github.com/NigelEarle/80150ff1c50031e59b872baf0e474977
const config = require('../../knexfile.js')['test'];
module.exports = require('knex')(config);
/**
 * Note
 */
//run migration in test connection: NODE_ENV=test knex migrate:latest (http://knexjs.org/#Migrations)
