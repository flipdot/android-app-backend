var request = require('request');
var db = require(__dirname+'/../db');
var settings = require(__dirname+'/../settings');
var log = require(__dirname+'/../log');

function Notification() {
  var self = this;

  self.send = function(receiverIds, action, params, callback) {
    var gcmUrl = 'https://android.googleapis.com/gcm/send';
    var req = {
      registration_ids: receiverIds,
      data: {
        action: action,
        params: params
      }
    }

    var options = {
      url: gcmUrl,
      method: 'POST',
      body: req,
      json: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'key='+settings.gcm.serverKey
      }
    }

    request(options, function(err, res, body){
      if(err){
        log.err('error sending push notification: '+err);
        return;
      }

      callback();
    })
  }

  self.sendToAll = function(action, params, callback) {
    db.registrations.find(function(err, users){
      if(err) throw err;
      users.toArray(function(err, usersArray){
        if(err) throw err;

        var ids = usersArray.map(function(u){ return u.gcmId});
        self.send(ids, action, params, callback);
      })
    })
  }
}

module.exports = new Notification();
