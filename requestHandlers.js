var request = require('request');

function start(callback) {
  console.log("Request handler 'start' was called.");
  callback("Hello Start");
  
}

function events(callback) {
  request('http://dipsplusmore.iriscouch.com/events/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    callback(body);
  } else {
    callback(error);
  }
});
}

exports.start = start;
exports.events = events;