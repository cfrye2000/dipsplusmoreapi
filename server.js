var http = require("http");
var url = require("url");

var server;


function start(route, handle) {
  function onRequest(request, response) {
    console.log("Request received.");
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    response.writeHead(200, {"Content-Type": "text/plain"});
    route(handle, pathname, function(content){
        response.write(content);
        response.end();
        
    });
    
  }

  server =  http.createServer(onRequest);
  server.listen(process.env.PORT);
  console.log("Server has started.");
}

function close(){
    server.close();
}

exports.start = start;
exports.close = close;