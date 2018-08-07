// Update with your config settings.
const path = require('path');

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'express_gallery',
      user:     'happy_user',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations'),
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
