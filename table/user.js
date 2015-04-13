var pool = require('../dao/mongodbc');

var Users = new pool.Schema({
  userId: {type: String},
  username: {type: String},
  password: {type: String},
  regTime: {type: Date, default: Date.now}
});

var User = module.exports = pool.db.model('user', Users);