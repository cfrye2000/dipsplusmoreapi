function route(handle, action, queryString, callback ) {
  console.log("About to route a request for " + action);
  if (typeof handle[action] === 'function') {
    return handle[action](queryString, callback);
  } else {
    console.log("No request handler found for " + action);
    callback(action + " Not found");
  }
}

exports.route = route;