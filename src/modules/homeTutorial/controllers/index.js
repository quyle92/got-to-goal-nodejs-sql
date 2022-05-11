const { resSuccess, resPaginationSuccess, resError } = require('../../../utils/apiResponse');
const Player = require('../../../app/models/Player');
const Character = require('../../../app/models/Character');
const knex = require('../../../db/knex');
const homeTutorialService = require('../services');

module.exports = {
    getPlayerList: async (req, res, next) => {
        let page = req.query.page;
        let players = await Player.query().page(page - 1, 10);
        return res.json(resPaginationSuccess(players));
    },

    getCharacterList: async (req, res, next) => {
        let characters = await Character.query().withGraphFetched('superpower(defaultSelects)');
        return res.json(resSuccess(characters));
    },

    selectCharacter: async (req, res, next) => {
        let player = req.player;
        let characterId = req.body.characterId;
        await knex.transaction(async trx => {
            Promise.all([
                await homeTutorialService.saveFirstThreeDefaultCharacters(player, trx),
                await homeTutorialService.saveCustomSelectedCharacter(player, characterId, trx),
                await homeTutorialService.setTutorialStartTime(player, trx),
            ]);
        });

        return res.json(resSuccess());
    },

    updateTutorialProgress: async (req, res, next) => {
        let player = req.player;
        let step = req.body.step;
        let characterPlayedInTutorial = await knex.transaction(async trx => {
            return Promise.all([
                await homeTutorialService.updateTutorialProgress(player, step, trx),
                await homeTutorialService.getCharacterPlayedInTutorial(player, trx),
            ])
        });

        return res.json(resSuccess(characterPlayedInTutorial[1]));
    }
}