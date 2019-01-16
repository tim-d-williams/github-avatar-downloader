var request = require('request');
var fs = require('fs');
var secrets = require('./secrets')

console.log('Welcome to the GitHub Avatar Downloader!');

var token = secrets.GITHUB_TOKEN;
console.log("token: ", token)
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token
    }
  };
  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    var fileDownload = [];
    for (var element in data) {
      // var aviUrl = data[i].avatar_url
      fileDownload.push ({
        url:data[element].avatar_url,
        path:'avatars/' + data[element].login
      })
      // console.log(data[element].login)
      // fileDownload[element].path = 'avatars/' + data.login


    } console.log(fileDownload);

   cb(err, body)
});
}
function downloadImageByURL(url, filePath) {
  // console.log("download: ", url)
  request.get (url)
  .pipe(fs.createWriteStream(filePath));
}

// downloadImageByURL(url, filePath)

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
});

