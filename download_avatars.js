var request = require('request');

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "result",
      "Authorization": "token 486af535b36293a4b6ab3d8e8f8d55ac759aa0d0"
    }
  };
  request(options, function(err, res,body) {
    cb(err, body);
  });

}

console.log("Welcome to the GitHub Avatar Downloader!");