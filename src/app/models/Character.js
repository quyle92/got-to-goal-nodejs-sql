const { Model } = require('objection');
const knex = require('../../db/knex');
Model.knex(knex);
const Player = require('./Player');
const Superpower = require('./Superpower');

const DEFAULT_CHARACTER_ID_LIST = [1,2,3]
class Character extends Model {
    static get defaultCharacterIdList() {
        return DEFAULT_CHARACTER_ID_LIST;
    }

    static get tableName() {
        return 'characters';
    }

    static relationMappings = {
        characters: {
            relation: Model.ManyToManyRelation,
            modelClass: Player,
            join: {
                from: 'characters.id',
                through: {
                    from: 'characters_players.character_id',
                    to: 'characters_players.player_sn',
                    extra: ['point', 'is_favorite', 'status', 'speed', 'passing', 'stamina', 'shooting', 'tackling']
                },
                to: 'players.player_sn'
            }
        },

        superpower: {
            relation: Model.BelongsToOneRelation,
            modelClass: Superpower,
            join: {
                from: 'characters.superpower_id',
                to: 'superpowers.id'
            }
        }
    };
}

module.exports = Character;
