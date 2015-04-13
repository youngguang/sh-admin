var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/test');

var Schema = mongoose.Schema;

var Person = new Schema({
    name: String,
    age: Number,
    phone: String
});

var User = db.model('userinfo', Person);

/**
 *  新增用户
 */
exports.add = function() {
  new User({name:"youngguang", age: "25", phone:"15050561539"}).save(function(err) {
    if (err) {
      console.log("新增失败" + err);
    } else {
      console.log("新增成功");
    }
  })
}

