var genericDAO = require('./genericDAO');

function ping(container, httpMethod, action, queryString, postData, callback){
    console.log("Request handler 'ping' was called.");
    callback('Ping!');
}


function processRequest(container, httpMethod, action, queryString, postData, callback) {
    if (httpMethod === 'GET'){
        genericDAO.getAll(container, action, callback);
    } else if (httpMethod === 'POST'){
        //validate postData
        var validator = container.validators[action];
        validateThenProcess(postData, validator, function (returnJSON){
            if (returnJSON.ok !== undefined && returnJSON.ok){
                genericDAO.post(container, action, postData, callback);
            } else {
                callback(JSON.stringify(returnJSON));
            }
        });
        
    } else {
        callback("HTTP Method: " + httpMethod + " is not supported");
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