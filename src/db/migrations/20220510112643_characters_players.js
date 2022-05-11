/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('characters_players', function (table) {
        table.increments('id').primary();
        table.uuid('player_sn');
        table.integer('character_id');
        table.integer('point');
        table.integer('is_favorite');
        table.enu('status', ['unlocked', 'selected']);
        table.integer('speed');
        table.integer('passing');
        table.integer('stamina');
        table.integer('shooting');
        table.integer('tackling');
        table.timestamps(true, true);

        table.unique(['player_sn', 'character_id'], 'idx_player_sn_character_id', {
            storageEngineIndexType: 'btree',
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable("characters_players")
};
