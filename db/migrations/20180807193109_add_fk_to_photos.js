
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('photos', table => {
    table.integer('author_id').references('users.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('photos', table => {
    table.dropColumn('author_id');
  })
};
