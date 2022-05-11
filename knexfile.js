// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root', // replace with your mysql username
      password: '', // replace with your mysql password
      database: 'got_to_goal_nodejs'
    },
    migrations: {
      directory: __dirname + '/src/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/db/seeds'
    },
    debug: false
  },

  test: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root', // replace with your mysql username
      password: '', // replace with your mysql password
      database: 'gtg_testing_nodejs'
    },
    migrations: {
      directory: __dirname + '/src/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/db/seeds'
    },
    debug: false
  },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
