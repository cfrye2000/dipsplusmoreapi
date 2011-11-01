var
  assert = require('assert'),
  http = require('http'),
  server = require('./server'),
  router = require("./router"),
  requestHandlers = require('./requestHandlers'),
  request = require('request');
  

var handle = {};
handle[""] = requestHandlers.start;
handle.start = requestHandlers.start;
handle.events = requestHandlers.events;
handle.search = requestHandlers.search;


server.start(router.route, handle);

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