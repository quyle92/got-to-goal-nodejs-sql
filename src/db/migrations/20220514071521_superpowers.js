/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('superpowers', function (table) {
        table.increments('id').primary();
        table.string('superpower_name');
        table.text('superpower_description');
        table.enu('superpower_class', ["all_rounder", "defender", "striker"]);
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTable("superpowers")
};
