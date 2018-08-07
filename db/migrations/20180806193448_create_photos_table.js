
exports.up = function(knex, Promise) {
  return knex.schema.createTable( 'photos', table => {
    table.increments();
    table.text('author').notNullable();
    table.text('link').notNullable();
    table.text('description').notNullable;
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photos');
};
