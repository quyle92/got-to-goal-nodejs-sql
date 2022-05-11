const { Model } = require('objection');
const knex = require('../../db/knex');
Model.knex(knex);

class Superpower extends Model {
    static get tableName() {
        return 'superpowers';
    }

    static get modifiers() {
        return {
            defaultSelects(builder) {
                builder.select('superpower_name', 'superpower_description', 'superpower_class');
            },
        };
    }
}

module.exports = Superpower;
