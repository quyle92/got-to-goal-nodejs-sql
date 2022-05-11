/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('superpowers').delete();
  let data = [
    {
      'superpower_name': 'Power shot',
      'superpower_description': 'Increase shooting power by 10%.',
      'superpower_class': 'striker'
    },
    {
      'superpower_name': 'Power jump shot',
      'superpower_description': 'Increase shooting power within a range of 0% to 25%.',
      'superpower_class': 'striker'
    },
    {
      'superpower_name': 'Swift Movement',
      'superpower_description': 'Weave through opponents for 3 seconds before unleashing a shot at 15% strength%.',
      'superpower_class': 'striker'
    },
    {
      'superpower_name': 'Blink over an opponent',
      'superpower_description': 'Blink x pixels. If player ends up in the same position as opponent, then player will move BEHIND opponent while giving up possession.',
      'superpower_class': 'striker'
    },
    {
      'superpower_name': 'Power curve kick',
      'superpower_description': 'Shoot in a curve.',
      'superpower_class': 'striker'
    },
    {
      'superpower_name': 'Fast block movement',
      'superpower_description': 'Executes multiple quick sliding tackles based on where user swipes.',
      'superpower_class': 'defender'
    },
    {
      'superpower_name': 'Power slide',
      'superpower_description': 'Increase slide distance by 20%.',
      'superpower_class': 'defender'
    },
    {
      'superpower_name': 'Growth',
      'superpower_description': 'Increase size by 10% for 3 seconds.',
      'superpower_class': 'defender'
    },
    {
      'superpower_name': 'Blink',
      'superpower_description': 'Increase size by 10% for 3 seconds.',
      'superpower_class': 'defender'
    },
    {
      'superpower_name': 'Clearance',
      'superpower_description': 'Clear the ball to the opponent’s half.',
      'superpower_class': 'defender'
    },
    {
      'superpower_name': 'Deactivation',
      'superpower_description': 'Deactivate all opponent’s super power that is currently active.',
      'superpower_class': 'all_rounder'
    },
    {
      'superpower_name': 'Rapid return',
      'superpower_description': 'Teleport all team mates back to defend.',
      'superpower_class': 'all_rounder'
    },
    {
      'superpower_name': 'Goal shift',
      'superpower_description': 'Goal post to move around across the goal line for 20 seconds.',
      'superpower_class': 'all_rounder'
    },
    {
      'superpower_name': 'Immunity',
      'superpower_description': 'Team mate immune to any power down for 5 seconds.',
      'superpower_class': 'all_rounder'
    },
    {
      'superpower_name': 'Heavy boots',
      'superpower_description': 'Slow enemy movement by 5% for 3 seconds.',
      'superpower_class': 'all_rounder'
    },
  ];
  await knex('superpowers').insert([
    ...data
  ]);
};
