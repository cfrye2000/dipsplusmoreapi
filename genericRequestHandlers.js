var genericDAO = require('./genericDAO');

function ping(container, httpMethod, action, queryString, postData, callback){
    console.log("Request handler 'ping' was called.");
    callback('Ping!');
}


function processRequest(container, httpMethod, action, queryString, postData, callback) {
    if (httpMethod === 'GET'){
        genericDAO.getAll(container, action, callback);
    } else if (httpMethod === 'POST'){
        eventDAO.post(container, action, postData, callback);
    } else {
        callback("HTTP Method: " + httpMethod + " is not supported");
    }
    
}



exports.processRequest = processRequest;
exports.ping = ping;