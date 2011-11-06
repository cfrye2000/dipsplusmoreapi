function route(container, httpMethod, action, queryString, postData, callback ) {
  console.log("About to route a request for " + action);
  if (typeof container.handlers[action] === 'function') {
    return container.handlers[action](container, httpMethod, action, queryString, postData, callback);
  } else {
    console.log("No request handler found for " + action);
    callback(action + " Not found");
  }
}

exports.route = route;