function route(container, httpMethod, resource, queryString, postData, callback ) {
  console.log("About to route a request for " + resource);
  if (typeof container.resources[resource] === 'function') {
    return container.resources[resource](container, httpMethod, resource, queryString, postData, callback);
  } else {
    console.log("No request handler found for " + resource);
    callback(container.errorFormatter(false, {notFound : resource}));
  }
}

exports.route = route;