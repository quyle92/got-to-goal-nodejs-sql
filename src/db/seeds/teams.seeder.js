const { faker } = require('@faker-js/faker');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('teams').truncate();
  let teams = [];
  for (i = 0; i < 100; i++) {
    teams.push({
      team_sn: faker.datatype.uuid(),
      team_name: faker.company.companyName(),
      description: faker.lorem.sentence(15),
      max_player: faker.datatype.number({ 'min': 10, 'max': 50 }),
    });
  }
  await knex('teams').insert([
    ...teams
  ]);
};
