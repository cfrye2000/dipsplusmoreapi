var genericDAO = require('./genericDAO');

function ping(container, httpMethod, resource, queryString, postData, callback){
    console.log("Request handler 'ping' was called.");
    callback(JSON.stringify({"ok" : true, message : "PING!"}));
}


function processRequest(container, httpMethod, resource, queryString, postData, callback) {
    if (httpMethod === 'GET'){
        genericDAO.getAll(container, resource, callback);
    } else if (httpMethod === 'POST'){
        //validate postData
        var validator = container.validators[resource];
        validateThenProcess(postData, validator, function (returnJSON){
            if (returnJSON.ok !== undefined && returnJSON.ok){
                genericDAO.post(container, resource, postData, callback);
            } else {
                callback(container.errorFormatter(false, returnJSON));
            }
        });
        
    } else {
        callback(container.errorFormatter(false, {HTTPMethodNotSupported : httpMethod}));
    }
    
}

function validateThenProcess(postData, validator, callback){
    if (typeof validator === 'function') {
        var returnJSON = validator(postData);
        callback(returnJSON);
    } else {
        callback({"ok" : true});
    }
}



exports.processRequest = processRequest;
exports.ping = ping;