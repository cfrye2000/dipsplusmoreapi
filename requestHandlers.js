var eventsDAO = require('./eventsDAO');

function start(callback) {
  console.log("Request handler 'start' was called.");
  callback("Hello Start");
  
}

function events(callback) {
    eventsDAO.events(callback);
}

exports.start = start;
exports.events = events;