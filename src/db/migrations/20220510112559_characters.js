/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('characters', function (table) {
        table.increments('id').primary();
        table.string('character_name').notNullable();
        table.string('default_avatar').notNullable();
        table.string('winner_avatar');
        table.integer('default_speed').notNullable();
        table.integer('default_passing').notNullable();
        table.integer('default_stamina').notNullable();
        table.integer('default_shooting').notNullable();
        table.integer('default_tackling').notNullable();
        table.integer('superpower_id').notNullable();
        table.integer('coin').notNullable();
        table.integer('premium_currency').notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable("characters")
};
