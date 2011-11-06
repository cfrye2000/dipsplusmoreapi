var
  assert = require('assert'),
  http = require('http'),
  server = require('./server'),
  router = require("./router"),
  requestHandlers = require('./requestHandlers'),
  genericRequestHandlers = require('./genericRequestHandlers'),
  request = require('request');
  
// dependency injection container
var container = {};
container.dbURL = 'http://chrisfrye.iriscouch.com/';

var handle = {};
handle[""] =  genericRequestHandlers.ping;
handle.ping = genericRequestHandlers.ping;
handle.events = genericRequestHandlers.processRequest;
handle.chris = genericRequestHandlers.processRequest;
handle.search = requestHandlers.search;

container.handlers = handle;


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