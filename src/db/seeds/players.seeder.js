const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('players').truncate();
  let [teams, password] = await Promise.all([
    knex.select('*').from('teams'),
    bcrypt.hash('123', 10)
  ]);

  let players = [];
  teams.forEach(function(team, index) {
    for (let i = 0; i < 1; i++) {
      let count = ++index;
      players.push({
        player_sn: faker.datatype.uuid(),
        player_name: `player${count}`,
        email: `player${count}@gmail.com`,
        password: password,
        team_sn: team.team_sn,
        is_leader: i === 0 ? 1 : 0,
        is_unlock_team: 1,
        is_unlock_h2h: 1,
        is_unlock_shop: 1,
        premium_currency: 100,
        coin: 100,
        new_boots: 100,
        megashield: 100,
        compass: 100,
      });
    }
  });
  await knex('players').insert([
    ...players
  ]);
};
