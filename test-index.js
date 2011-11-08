var
  assert = require('assert'),
  http = require('http'),
  server = require('./server'),
  router = require("./router"),
  module = require('./module');
  request = require('request');
  
// dependency injection container
var container = module.build();

//start the server
server.start(router.route, container);


//**** Tests ******//

//first basic test
request('http://dipsandmoreapi.cfrye2000.c9.io/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    assert.ok(response.statusCode == 200);
  }
});

//test not found
request('http://dipsandmoreapi.cfrye2000.c9.io/lisa', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    assert.ok(body == '{"okay":false,"messages":{"notFound":"lisa"}}');
  }
});

//server.close();