var eventsDAO = require('./eventsDAO');
var request = require('request');


function start(callback) {
  console.log("Request handler 'start' was called.");
  callback("Hello Start");
  
}

function events(callback) {
    eventsDAO.events(callback);
}

function translate(callback) {
     request('https://www.googleapis.com/language/translate/v2?key=AIzaSyB_TAdGIdZnB-n9IJbMrgYh-IMnYSyKQu0&source=en&target=de&q=Hello%20world', function (error, response, body) {
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

exports.start = start;
exports.events = events;
exports.translate = translate;