var http = require("http");
var url = require("url");

var server;


function start(route, handle) {
  function onRequest(request, response) {
    console.log("Request received.");
    var httpMethod = request.method;
    console.log("http method: " + httpMethod);
    var pathname = url.parse(request.url).pathname;
    var splitPathname = pathname.split("/");
     console.log("full request" + splitPathname);
    var action = splitPathname[1];
    splitPathname.splice(0,2);
    var queryString = splitPathname;
    if (queryString === null){
        queryString = [];
    }
    console.log("Request for " + action + " and " + queryString);
    var postData ='';
    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
      postDataChunk + "'.");
    });
    
    console.log("Request for " + action + " and " + queryString + "and post data " + postData);


    response.writeHead(200, {"Content-Type": "text/plain"});
    request.addListener("end", function() {
        route(handle, httpMethod, action, queryString, postData, function(content){
            response.write(content);
            response.end();
            
        });
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