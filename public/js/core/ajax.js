var ajax = function (url, data) {
  var deferred = $.Deferred();
  var options = {
    url: url,
    data: data,
    type: 'POST',
    timeout: 10000,
    success: function (json) {
      if (json.status === 'ok') {
        deferred.resolve(json.data);
      } else {
        deferred.reject(json.msg);
      }
    },
    error: function (json) {
      deferred.reject(json.msg);
    }
  }
  $.ajax(options);

  return deferred.promise();
}