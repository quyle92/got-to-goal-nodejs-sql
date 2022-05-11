const Character = require("../../../app/models/Character");
const Player = require("../../../app/models/Player");
const knexTest = require("../../../db/knex-test");
const knex = require('../../../db/knex');

module.exports = {
    async saveFirstThreeDefaultCharacters(player, trx) {
        let insertPromises = [];
        //insert multiple rows in association table M-M relationship: https://stackoverflow.com/a/57226253/11297747, https://vincit.github.io/objection.js/recipes/extra-properties.html
        for (let i = 0; i < Character.defaultCharacterIdList.length; i++) {
            insertPromises.push(
                player.$relatedQuery('characters',trx).relate({
                    id: Character.defaultCharacterIdList[i],
                    status: 'unlocked',
                    created_at: new Date()
                })
            );
        }
        await Promise.all(insertPromises).catch((err) => {
            throw err
        });
    },

    async saveCustomSelectedCharacter(player, characterId, trx) {
        await player.$relatedQuery('characters', trx).relate({
            id: characterId,
            status: 'selected',
            created_at: new Date()
        });
    },

    async setTutorialStartTime(player, trx) {
        await player.$query(trx).patch({
            tutorial_started_at: new Date()
        });
    },

    async updateTutorialProgress(player, step, trx) {
        await player.$query(trx).update({
            tutorial_step_passed: step
        })
    },

    async getCharacterPlayedInTutorial(player, trx) {
        if (player.tutorial_step_passed === 5) {
            await knex('characters_players')
                    .where('player_sn', player.player_sn)
                    .where('status', 'selected')
                    .update({
                        status: 'unlocked'
                    });
        }

        return await player.$query(trx).select('player_name')
            .withGraphFetched('characters.superpower(defaultSelects)')
            .modifyGraph('characters', builder => {
                builder.select('character_name', 'is_favorite', 'status');
            });
    },
}