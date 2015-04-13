var index = require('./index');

/*var user = require('./user/users')
var login = require('./login/login')
var reg = require('./login/reg')
var config = require('../config')

var User = require('../table/user');*/


var routes = module.exports = function(app) {

  app.use('/', index);


 /* app.use(function(req, res, next) {
    if (req.session.userId) {
      var userId = req.session.userId;
      User
        .findOne()
        .select('userId username')
        .where('userId', userId)
        .exec(function(error, user) {
          if (!error && user) {
            req.user = user;
            next();
          }
          else {
            next();
          }
        })
    } else {
      next()
    }
  })

  // 未登录可请求
  var beforeLoginRequests = [index, reg]
  app.use("/", beforeLoginRequests);


  // 登录拦截器
  app.use(function(req, res, next) {
      if (!req.session.userId &&  req.path != '/login') {
        var redirect = req.hostname + (config.out_port != '80' ? ':' + config.out_port : '')  + req.originalUrl;
        return res.redirect('/login?redirect=http://' + redirect);
      }
      next()
  })


  // 登录后方可请求
  var afterLoginRequests = [login, user]
  app.use("/", afterLoginRequests);*/
}