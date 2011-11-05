function route(handle, httpMethod, action, queryString, postData, callback ) {
  console.log("About to route a request for " + action);
  if (typeof handle[action] === 'function') {
    return handle[action](httpMethod, queryString, postData, callback);
  } else {
    console.log("No request handler found for " + action);
    callback(action + " Not found");
  }
}

exports.route = route;