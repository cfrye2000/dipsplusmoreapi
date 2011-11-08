var
  requestHandlers = require('./requestHandlers'),
  genericRequestHandlers = require('./genericRequestHandlers'),
  eventsDAO = require('./eventsDAO');

function build(){
    // dependency injection container
    var container = {};
    container.dbURL = 'http://chrisfrye.iriscouch.com/';
    container.errorFormatter = errorFormatter;
    
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
    return container;
}


var errorFormatter = function (okay, messages){
    var result = {};
    result.okay = okay;
    result.messages = messages;
    return JSON.stringify(result);
};



exports.build = build;