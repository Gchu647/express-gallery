
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name').notNull();
    table.string('email').notNull();
    table.string('username').unique().notNull();
    table.string('password').notNull();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
