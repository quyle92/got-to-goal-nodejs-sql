/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('games', function (table) {
        table.increments('id').primary();
        table.string('game_code');
        table.enu('game_mode', ['3v3','5v5']);
        table.enu('tie_breaker', ['golden_goal','penalty']);
        table.enu('privacy', ['public','private']);
        table.json('result_set');
        table.timestamp('started_at');
        table.timestamp('finished_at');
        table.timestamps();

        table.unique('game_code');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable("games")
};
