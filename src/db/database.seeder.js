const environment = process.env.ENVIRONMENT || 'development'
const config = require('../../knexfile')[environment];
const knexInstance = require('knex')(config);
(async () => {
    let seeding_list = [
        '/usr/local/var/www/got-to-goal-nodejs-sql/src/db/seeds/teams.seeder.js',
        '/usr/local/var/www/got-to-goal-nodejs-sql/src/db/seeds/players.seeder.js',
        '/usr/local/var/www/got-to-goal-nodejs-sql/src/db/seeds/superpowers.seeder.js',
        '/usr/local/var/www/got-to-goal-nodejs-sql/src/db/seeds/characters.seeder.js',
        '/usr/local/var/www/got-to-goal-nodejs-sql/src/db/seeds/characters_players.seeder.js',
        '/usr/local/var/www/got-to-goal-nodejs-sql/src/db/seeds/games.seeder.js',
        '/usr/local/var/www/got-to-goal-nodejs-sql/src/db/seeds/games_players.seeder.js',
    ]
    await knexInstance.seed._runSeeds(seeding_list);
    console.log('Done all seeding');
})();