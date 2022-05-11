/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('teams', function (table) {
        table.increments('id').primary();
        table.uuid('team_sn');
        table.string('team_name').notNullable();
        table.integer('max_player').defaultTo(10);
        table.string('description');
        table.string('emblem_id').defaultTo(1);
        table.enu('team_status', ['active', 'disbanded']).defaultTo('active');
        table.timestamps(true,true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable("teams")
};
