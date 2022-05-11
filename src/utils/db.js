const knex = require('../db/knex.js');
const _sample = require('lodash/sample');
const _map = require('lodash/map');

module.exports = {
    getEnumFieldValues: async function(table, field)
    {
        let enu = await knex.raw(`SHOW COLUMNS FROM ${table} WHERE Field = '${field}'`);
        return enu[0][0].Type.match(/^enum\((.*)\)$/)[1].replace("'", '').replace(/'/g, '').split(',');
    },

    getRandomPlayer: async function (excludedPlayers) {
        let players = await knex('players').select('player_sn')
                        .orderByRaw('RAND()');
        player_sn_list = _map(players, 'player_sn')
        do {
            var player_sn = _sample(player_sn_list);
        } while (excludedPlayers.includes(player_sn));

        return player_sn;
    },

    getRandomCharacter: async function () {
        let characters = await knex('characters').select('id')
                            .orderByRaw('RAND()');

        let selectedCharacters = [];
        while (selectedCharacters.length < 3) {
            //_sample(): get random element.
            let characterId = _sample(characters);
            if (selectedCharacters.indexOf(characterId) === -1) selectedCharacters.push(characterId);
        }

        return _map(selectedCharacters, 'id');
    },


}
