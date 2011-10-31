function route(handle, pathname, callback ) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    return handle[pathname](callback);
  } else {
    console.log("No request handler found for " + pathname);
    callback(pathname + " Not found");
  }
}

exports.route = route;