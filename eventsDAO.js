function validateEvent(eventString){
    console.log("event to validate: " + eventString);
    var event = JSON.parse(eventString);
    var returnJSON = {};
    returnJSON.ok = true;
    
    if (event.publicCanSee === undefined || event.publicCanSee === null){
        returnJSON.ok = false;
        returnJSON.publicCanSee = 'missing';
    }
    
    if (event.description === undefined || event.description === null){
        returnJSON.ok = false;
        returnJSON.description = 'missing';
    }
    
    if (event.startDate === undefined || event.startDate === null){
        returnJSON.ok = false;
        returnJSON.startDate = 'missing';
    }
    
    if (event.endDate === undefined || event.endDate === null){
        returnJSON.ok = false;
        returnJSON.endDate = 'missing';
    }
    
    console.log("result of Event Validation: " + JSON.stringify(returnJSON));
    
    return returnJSON;
}

exports.validateEvent = validateEvent;