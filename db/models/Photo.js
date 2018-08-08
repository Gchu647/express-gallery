const bookshelf = require('./bookshelf');

class Photo extends bookshelf.Model {
  get tableName() {return 'photos'};
  get hasTimestamps() {return true};

  author() {
    return this.belongsTo('User', 'author_id');
  }
}

module.exports = bookshelf.Model('Photo', Photo);