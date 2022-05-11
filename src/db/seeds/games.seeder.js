const utils = require('../../utils/index');
const _sample = require('lodash/sample');
const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('games').truncate();
  let games = [];

  let gameMode = await utils.db.getEnumFieldValues('games', 'game_mode');
  let tieBreaker = await utils.db.getEnumFieldValues('games', 'tie_breaker');
  let privacy = await utils.db.getEnumFieldValues('games', 'privacy');
  for ($i = 0; $i < 10000; $i++) {
    let startedAt = utils.date.randomDate(new Date(2012, 0, 1), new Date());
    games.push({
      game_code: faker.datatype.uuid(),
      game_mode: _sample(gameMode),
      tie_breaker: _sample(tieBreaker),
      privacy: _sample(privacy),
      result_set: JSON.stringify([
        faker.datatype.number({ 'min': 1, 'max': 10 }) + '-' + faker.datatype.number({ 'min': 1, 'max': 10 }),
        faker.datatype.number({ 'min': 1, 'max': 10 }) + '-' + faker.datatype.number({ 'min': 1, 'max': 10 }),
        faker.datatype.number({ 'min': 1, 'max': 10 }) + '-' + faker.datatype.number({ 'min': 1, 'max': 10 }),
      ]),
      started_at: startedAt,
    });
  }
  await knex('games').insert([
    ...games
  ]);
  console.log('done game seeder')
};
