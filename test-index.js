var
  assert = require('assert'),
  http = require('http'),
  server = require('./server'),
  router = require("./router"),
  requestHandlers = require('./requestHandlers'),
  genericRequestHandlers = require('./genericRequestHandlers'),
  eventsDAO = require('./eventsDAO'),
  request = require('request');
  
// dependency injection container
var container = {};
container.dbURL = 'http://chrisfrye.iriscouch.com/';

//resourcers by action
var resource = {};
resource[""] =  genericRequestHandlers.ping;
resource.ping = genericRequestHandlers.ping;
resource.events = genericRequestHandlers.processRequest;
resource.chris = genericRequestHandlers.processRequest;
resource.search = requestHandlers.search;

container.resources = resource;


//incoming data validators by action
var validators = {};
validators.events = eventsDAO.validateEvent;

container.validators = validators;


server.start(router.route, container);

//first basic test
request('http://dipsandmoreapi.cfrye2000.c9.io/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    assert.ok(response.statusCode == 200);
  }
});

//test not found
request('http://dipsandmoreapi.cfrye2000.c9.io/lisa', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    assert.ok(body == 'lisa Not found');
  }
});

//server.close();