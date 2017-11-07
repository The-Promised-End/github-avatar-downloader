var request = require('request');
var secret = require('./secrets');
var fs = require('fs');

var repoOwner = process.argv[2];
var repoName = process.argv[3];



console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secret.GITHUB_TOKEN
    },
    json: true
  };

  // console.log("optinos", options);

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

function downloadImageByUrl(url, filePath){
  request.get(url)
       .on('error', function (err) {
         throw console.log('rip', err);
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));

}


getRepoContributors(repoOwner, repoName, function(err, contributors) {
  console.log("Errors:", err);
  contributors.forEach(function(contributor) {
    var filePath = 'avatars/' + contributor.login + '.jpg'
    var url = contributor.avatar_url;
    //  contributor.avatar_url + contributor.login + '.jpg'
    downloadImageByUrl(url, filePath);
  })
});



