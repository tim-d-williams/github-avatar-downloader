var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ca4f3931a48fd695b3838a40bdf344168a3bd88e'
    }
  };

  request(options, function(err, res, body) {
    cb(err, body)
    // var data = JSON.parse(body);
    // console.log(data)
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  var data = JSON.parse(result);
  var aviUrl = [];
  for (var i = 0; i < data.length; i++)
    aviUrl.push(data[i].avatar_url);
  console.log("avi ", aviUrl)
  console.log("Errors:", err);
  // console.log("Result:", result);

});
