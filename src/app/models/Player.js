const { Model } = require('objection');
const knex = require('../../db/knex');
Model.knex(knex);
const Character = require('./Character');
const vars = require('../../config/vars');
const auth = require('../../utils/auth');
const jwt = require('jsonwebtoken');

class Player extends Model {
    static get tableName() {
        return 'players';
    }

    static get idColumn() {
        return 'player_sn';
    }

    static relationMappings = {
        characters: {
            relation: Model.ManyToManyRelation,
            modelClass: Character,
            join: {
                from: 'players.player_sn',
                through: {
                    from: 'characters_players.player_sn',
                    to: 'characters_players.character_id',
                    extra: ['point', 'is_favorite', 'status', 'speed', 'passing', 'stamina', 'shooting', 'tackling', 'created_at','updated_at']
                },
                to: 'characters.id',
            }
        }
    }

    verifyPassword(plainPwd) {
        try {
            let hashPwd = this.password;
            return auth.isPasswordCorrect(plainPwd, hashPwd);
        } catch (error) {
            throw error
        }
    }

    generateJWT() {
        let payload = {
            email: this.email
        }
        let options = {
            expiresIn: '7d'
        }
        return jwt.sign(payload, vars.jwtSecret, options);
    }
}

module.exports = Player;
