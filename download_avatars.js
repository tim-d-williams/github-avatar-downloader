var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

var token = secrets.GITHUB_TOKEN;

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token
    }
  };
  request(options, function(err, res, body) {
      cb(err, body);
      var data = JSON.parse(body);
      var urlToDownload = null;
      var pathToSave = null;
      for (const key in data) {
        urlToDownload = data[key].avatar_url;
        pathToSave = 'avatars/' + data[key].login +'.jpg';
        downloadImageByURL(urlToDownload, pathToSave)
        }
      });
  }

function downloadImageByURL(url, filePath) {
    request.get (url)
    .pipe(fs.createWriteStream(filePath));
}

var owner = process.argv[2];
var repo = process.argv[3];
if (!owner || !repo ) {
  console.log('You must provide both owner and repo!');
} else {
  getRepoContributors(owner, repo, function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
  });
}
