var express = require('express');
var router = express.Router();
var pool = require('../../dao/mongodbc');
var utils = require('utility')
var crypto = require('crypto')

var com = require('../base/com')
var User = require('../../table/user');

/**
 *  注册页面
 */
router.get('/register', function (req, res, next) {
  res.render('login/reg');
})

/**
 *  注册请求
 */
router.post('/register', function (req, res, next) {
  var userId;
  validUsername(req.param('username')).then(function(user) {
    if (user) {
      res.json(com.failJsonRes(null, '该用户名已被使用，请重新输入。'));
    } else {
      var param = {
        userId: userId = com.getUserId(),
        username: req.param('username'),
        password: utils.md5(req.param('password'))
      }
      new User(param).save(function (err) {
        if (!err) {
          req.session.userId = userId;
          res.json(com.successJsonRes());
        }
        else {
          res.json(com.failJsonRes());
        }
      })
    }
  }, function() {
    res.json(com.failJsonRes());
  })
})

/**
 *  验证用户名是否存在
 */
router.post('/valid_username', function(req, res, next) {
  validUsername(req.param('username')).then(function(user) {
     if (user) {
       res.json(com.failJsonRes(null, '该用户名已被使用，请重新输入。'));
     } else {
       res.json(com.successJsonRes());
     }
  })
})

/**
 *  验证用户名是否已被注册
 */
var validUsername = function (username) {
   return  User.findOne().where('username', username).exec();
}

module.exports = router;
