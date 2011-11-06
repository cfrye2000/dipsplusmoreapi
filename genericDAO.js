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

exports.getAll = getAll;