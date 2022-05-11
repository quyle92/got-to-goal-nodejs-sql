const utils = require('../../utils/index');
const _sample = require('lodash/sample');
const _sortBy = require('lodash/sortBy');
const { faker } = require('@faker-js/faker');
const knex = require('../knex.js');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('games_players').truncate();
  let games = await knex.select('*').from('games');
  let chunkSize = 1000;

  for (let i = 0; i < games.length; i += chunkSize) {
  // for (let i = 0; i < 1; i++) {
    let chunk = games.slice(i, i + chunkSize);
    let gamePlayers = [];

    await Promise.all(
      chunk.map(async function (game) {
        if (game.game_mode === '3v3') {
          let player1s = [];
          for (let j = 0; j < 3; j++) {
            let player1 = await utils.db.getRandomPlayer(player1s);
            let characterIdList = await utils.db.getRandomCharacter();
            player1s.push(player1);
            gamePlayers.push({
              game_code: game.game_code,
              player_sn: player1,
              character_id_list: JSON.stringify([...characterIdList]),
              final_result: j === 2 ? 'disconnected' : 'won',
              goal_scored: faker.datatype.number({ min: 1, max: 10 }),
              created_at: game.started_at
            });
          }

          let player2s = [];
          player2s = player1s;
          for (let j = 0; j < 3; j++) {
            let player2 = await utils.db.getRandomPlayer(player2s);
            let characterIdList = await utils.db.getRandomCharacter();
            player2s.push(player2);
            gamePlayers.push({
              game_code: game.game_code,
              player_sn: player2,
              character_id_list: JSON.stringify([...characterIdList]),
              final_result: j === 2 ? 'disconnected' : 'lost',
              goal_scored: faker.datatype.number({ min: 1, max: 10 }),
              created_at: game.started_at
            });
          }
        }

        if (game.game_mode === '5v5') {
          let player1s = [];
          for (let j = 0; j < 5; j++) {
            let player1 = await utils.db.getRandomPlayer(player1s);
            let characterIdList = await utils.db.getRandomCharacter();
            player1s.push(player1);
            gamePlayers.push({
              game_code: game.game_code,
              player_sn: player1,
              character_id_list: JSON.stringify([...characterIdList]),
              final_result: j === 2 ? 'disconnected' : 'won',
              goal_scored: faker.datatype.number({ min: 1, max: 10 }),
            })
          }

          let player2s = [];
          player2s = player1s;
          for (let j = 0; j < 5; j++) {
            let player2 = await utils.db.getRandomPlayer(player2s);
            let characterIdList = await utils.db.getRandomCharacter();
            player2s.push(player2);
            gamePlayers.push({
              game_code: game.game_code,
              player_sn: player2,
              character_id_list: JSON.stringify([...characterIdList]),
              final_result: j === 2 ? 'disconnected' : 'lost',
              goal_scored: faker.datatype.number({ min: 1, max: 10 }),
              created_at: game.started_at
            });
          }
        }

      })
    );

    gamePlayers = _sortBy(gamePlayers, [function (o) { return o.game_code; }]);
    await knex('games_players').insert([
      ...gamePlayers
    ]);
  }

};


