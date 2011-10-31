var request = require('request');

function events(callback) {
  request('http://chrisfrye.iriscouch.com/events/_all_docs?include_docs=true', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        if (body !== null){
            callback(body);
        } else {
            callback("nothing returned");
        }
      } else {
        callback(response.statusCode + ": events db error");
      }
    });
}

exports.events = events;