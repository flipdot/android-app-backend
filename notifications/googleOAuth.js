var request = require('request');

function GoogleOAuth() {
  var self = this;

  self.getTokenInfo = function(token, callback) {
    var url = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='+token;
    request(url, function(err, res, body){
      var tokenInfo = JSON.parse(body);
      callback(tokenInfo);
    });
  }
}

module.exports = new GoogleOAuth();
