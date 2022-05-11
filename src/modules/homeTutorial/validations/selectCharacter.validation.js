const { body } = require('express-validator');
const Character = require('../../../app/models/Character');
const { resError } = require('../../../utils/apiResponse');
const knex = require('../../../db/knex');

exports.selectCharacterValidation = [
    body("characterId").notEmpty().withMessage('characterId value must be present.').isInt().withMessage('characterId must be integer.').toInt()
        .custom(async (characterId, {req, location, path}) => {
            // await knex('characters_players').truncate();

            try {
                let characterIdList = await Character.query().select('id');
                characterIdList = characterIdList.map(item => item.id);
                if (!characterIdList.includes(characterId)) {
                    throw new Error("character Id is not valid.");
                }

                if (Character.defaultCharacterIdList.includes(characterId)) {
                    throw new Error(`${characterId} is default character id.`);
                }
                let alreadySelectedCharacterId = await knex('characters_players')
                    .select('character_id')
                    .where('player_sn', req.player.player_sn);
                alreadySelectedCharacterId = alreadySelectedCharacterId.map(item => item.character_id);

                if (alreadySelectedCharacterId.includes(characterId)) {
                    throw new Error(`${characterId} is already selected.`);
                }
            } catch (error) {
                throw error
            }
        }),

    (req, res, next) => {
        let rs = req.validateRequest();
        if (rs === true) next();
    },
]