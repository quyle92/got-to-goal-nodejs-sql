const _sample = require('lodash/sample');
const _map = require('lodash/map');
const utils = require('../../utils/index');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('characters_players').truncate();
  let players = await knex.select('player_sn').from('players');
  let data = [];
  let characters = await knex('characters').select('id')
    .whereNotIn('id', [1,2,3])
    .orderByRaw('RAND()');
  let character_id_list = _map(characters,'id');
  await Promise.all(players.map(function(player) {
    let characters_already_selected = []
    for (let i = 0; i < 8; i++) {
      do {
        var character_id = _sample(character_id_list);
      } while (characters_already_selected.includes(character_id));
      characters_already_selected.push(character_id)
      data.push({
        'player_sn': player.player_sn,
        'character_id': i === 0 ? 1 : (i === 1 ? 2 : (i === 2 ? 3 : character_id)),
        'is_favorite': i === 3 ? 1 : 0,
        'point': 50,
        'status': [0, 2, 3].includes(i) ? 'selected' : 'unlocked',
        'speed': 50,
        'passing': 50,
        'stamina': 50,
        'shooting': 50,
        'tackling': 50,
        'created_at': utils.date.randomDate(new Date(2012, 0, 1), new Date()),
      })
    }
  }))
  await knex('characters_players').insert([
    ...data
  ]);
};
