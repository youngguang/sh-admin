var utils = require('utility')

exports.successJsonRes = function(data, msg) {
   return {
      status: 'ok',
      msg: msg || '操作成功',
      data: data
   }
}

exports.failJsonRes = function(data, msg) {
  return {
    status: 'fail',
    msg: msg || '系统繁忙，请稍后再试。',
    data: data
  }
}

exports.getUserId = function() {
  return 'C00'+ utils.YYYYMMDDHHmmssSSS().replace(/-|:|\.| /g, '');
}