var request = require('request');
var fs = require('fs');
var GITHUB_TOKEN = require('./secrets')

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body)
    var data = JSON.parse(body);
    var url = [];
    var filePath = [];
    for (var i = 0; i < data.length; i++) {
      url.push(data[i].avatar_url);
      filePath.push('avatars/' + data[i].login);
  } console.log(url, filePath)
})
}

function downloadImageByURL(url, filePath) {
  request.get (url)
  .pipe(fs.createWriteStream(filePath));
}

//downloadImageByURL(aviUrl, path)

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);

});
