var request = require('request');
var fs = require('fs');

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
  });
}

function downloadImageByURL(url, filePath) {
  request.get (url)
  .pipe(fs.createWriteStream(filePath));
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")


getRepoContributors("jquery", "jquery", function(err, result) {
  var data = JSON.parse(result);
  var aviUrl = [];
  for (var i = 0; i < data.length; i++)
  aviUrl.push(data[i].avatar_url);
  console.log("Errors:", err);
  console.log("Result:", result);

});
