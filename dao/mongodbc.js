var Config = require('../config')
var mongoose = require('mongoose');

var db  = mongoose.connect(Config.mongo_url);
var Schema = mongoose.Schema;

module.exports = {
  mongoose:mongoose,
  db: db,
  Schema: Schema
}



