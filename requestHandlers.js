var eventsDAO = require('./eventsDAO');
var request = require('request');
var querystring = require("querystring");


function start(container, httpMethod, resource, queryString, postData, callback) {
  console.log("Request handler 'start' was called.");
  callback("Hello Start");
  
}

function events(container, httpMethod, resource, queryString, postData, callback) {
    if (httpMethod === 'GET'){
        eventsDAO.getEvents(callback);
    } else if (httpMethod === 'POST'){
        eventDAO.postEvent(postData, callback);
    } else {
        callback("HTTP Method: " + httpMethod + " is not supported");
    }
    
}


function search(container, httpMethod, resource, queryString, postData, callback) {
     console.log('queryString: ' + queryString);
     //query string is formed like this "search/fr/query"
     var fromLang = unescape(queryString[0]);
     var query = unescape(queryString[1]);
     console.log('query: ' + query);
     if (query === null){
         query = "";
     }
     
     var requestString = 'https://www.googleapis.com/language/translate/v2?key=AIzaSyB_TAdGIdZnB-n9IJbMrgYh-IMnYSyKQu0&target=en&' + querystring.stringify({"source" : fromLang, "q" : query});
     console.log('requesting: ' + requestString);
     
     request(requestString, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        if (body !== null){
            var result = JSON.parse(body);
            var query = result.data.translations[0].translatedText;
            doSearch(query, callback);
        } else {
            callback("nothing returned");
        }
      } else {
        callback(response.statusCode + ": translation error - poorly formed URL");
      }
    });
}

function doSearch(queryString, callback) {
     
     
     var requestString = 'http://api.crateandbarrel.com/APIHandler.ashx?pid=$qu1rr3lE@t3r&resource=search&' + querystring.stringify({"q" : queryString});
     console.log('requesting: ' + requestString);
     
     request(requestString, function (error, response, body) {
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
exports.search = search;