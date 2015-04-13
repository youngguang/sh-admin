var express = require('express');
var router = express.Router();
var utils = require('utility')

var User = require('../../table/user');
var com = require('../base/com')


/**
 *  登录入口
 */
router.get('/login', function(req, res, next) {
  if (req.session.userId) {
    return res.redirect('/');
  }
  res.render('login/login');
})

/**
 *  登录请求
 */
router.post('/login', function(req, res, next) {
  User
    .findOne()
    .select('userId username')
    .where('username', req.param('username'))
    .where('password', utils.md5(req.param('password')))
    .exec(function(error, user) {
      if (!error && user) {
        req.session.userId = user.userId
        res.json(com.successJsonRes());
      }
      else {
        res.json(com.failJsonRes());
      }
    })
})


/**
 *  退出登录
 */
router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err) {
      res.render('login/login');
    })
})


module.exports = router;
