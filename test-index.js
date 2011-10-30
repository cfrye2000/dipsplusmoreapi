var
  assert = require('assert'),
  http = require('http'),
  server = require('./server'),
  callbackFired = false;

server.start();

var request = require('request');
request('http://dipsandmoreapi.cfrye2000.c9.io/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    assert.ok(body == 'Hello World');
  }
});