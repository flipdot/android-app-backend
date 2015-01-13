var db = require(__dirname+'/../db');
var log = require(__dirname+'/../log');
var googleOAuth = require(__dirname+'/googleOAuth');

function Registration() {
  var self = this;

  self.handleRegistrationRequest = function(req, res) {
    var oAuthToken = req.body.token;
    var gcmId = req.body.gcmId;

    if(!oAuthToken){
      res.status(400).end('no oAuthToken given!');
      return;
    }

    if(!gcmId){
      res.status(400).end('no gcmId given!');
      return;
    }

    googleOAuth.getTokenInfo(oAuthToken, function(tokenInfo){
      if(tokenInfo.error){
        res.status(400).end('invalid token');
        return;
      }

      var username = tokenInfo.email;

      if(!username){
        log.err('invalid respose from google oAuth api!');
        return;
      }

      db.registrations.findOne({username: username}, function(err, item){
        if(err) {
          log.err('database error: '+err);
          return;
        }

        if(item) {
          log.warn('user '+username+' alread exists');
          res.status(400).end('user already registed!');
          return;
        }

        db.registrations.insert({
          username: username,
          gcmId: gcmId
        }, function(err){
          if(err){
            res.status(500).end("error storing data");
            return;
          }

          res.end("success");
        })
      })
    });
  }
}

module.exports = new Registration();
