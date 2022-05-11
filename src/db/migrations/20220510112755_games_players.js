/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('games_players', function (table) {
        table.increments('id').primary();
        table.uuid('game_code');
        table.uuid('player_sn');
        table.json('character_id_list');
        table.enu('final_result', ['won','lost','disconnected']);
        table.integer('goal_scored');
        table.timestamps(true, true);

        table.unique(['player_sn', 'game_code'], 'idx_player_sn_game_code', {
            storageEngineIndexType: 'btree',
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable("games_players");
};
