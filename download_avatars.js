var request = require('request');
var secret = require('./secrets.js')


function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      "Authorization": "token " + secret.GITHUB_TOKEN
    },
    json : true
  };

  request(options, function(err, res,body) {
    cb(err, body);
  });
}
getRepoContributors("jquery", "jquery", function(err, contributors) {
  console.log("Errors:", err);
  contributors.forEach(function(contributor) {
    console.log("Result:", contributor.avatar_url);
  })

});


console.log("Welcome to the GitHub Avatar Downloader!");