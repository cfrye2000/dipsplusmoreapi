var request = require('request');


function getAll(container, action, callback) {
  request(container.dbURL + '/' + action + '/_all_docs?include_docs=true', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        if (body !== null){
            var result = JSON.parse(body);
            var results = [];
            for (i=0;i<result.total_rows;i++){
                results.push(result.rows[i].doc);
            }
            callback(JSON.stringify(results));
        } else {
            callback("nothing returned");
        }
      } else {
        callback(response.statusCode + ": " + action + " db error");
      }
    });
}

function post(container, action, postData, callback) {
    var j = JSON.parse(postData);
    var s = JSON.stringify(j);
    var u = container.dbURL + action;
    console.log('about to post: ' + s + ' to ' + u);
  request(
    {method: 'POST',
     uri: u,
     json: s,
     'content-type': 'application/json'
    },
    function (error, response, body) {
      if (!error && response.statusCode == 201) {
        if (body !== null){
            callback(body);
        } else {
            callback("nothing returned");
        }
      } else {
        callback(response.statusCode + ": " + action + " db error" + body);
      }
    });
}

exports.getAll = getAll;
exports.post = post;