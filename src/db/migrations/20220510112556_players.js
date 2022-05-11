/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('players', function (table) {
        table.increments('id').primary();
        table.uuid('player_sn');
        table.string('fcm_token');
        table.string('player_name');
        table.uuid('team_sn');
        table.tinyint('is_leader');
        table.datetime('last_active');
        table.tinyint('is_bonus_activator');
        table.tinyint('bonus_pickup_status');
        table.datetime('team_joined_at');
        table.json('team_dismissed_info');
        table.tinyint('is_unlock_team');
        table.tinyint('is_unlock_h2h');
        table.tinyint('is_unlock_shop');
        table.string('background_color_url');
        table.datetime('tutorial_started_at');
        table.integer('tutorial_step_passed');
        table.tinyint('audio_status');
        table.tinyint('notification_status');
        table.integer('coin');
        table.integer('premium_currency');
        table.integer('rocket');
        table.integer('energy_drink');
        table.integer('new_boots');
        table.integer('megashield');
        table.integer('compass');
        table.tinyint('is_in_top_leaderboard');
        table.tinyint('type').defaultTo((1));
        table.string('email');
        table.string('password');
        table.enu('player_status', ['active', 'suspended']).defaultTo('active');
        table.timestamps(true, true);

        table.index('team_sn', 'idx_team_sn', { storageEngineIndexType: 'btree'});
        table.unique('email');
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable("players")
};
