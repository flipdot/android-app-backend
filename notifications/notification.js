var request = require('request');
var db = require(__dirname+'/../db');
var settings = require(__dirname+'/../settings');

function Notification() {
  var self = this;

  self.send = function(receiverIds, msg, callback) {
    var gcmUrl = 'https://android.googleapis.com/gcm/send';
    var req = {
      registration_ids: receiverIds,
      data: {
        msg: msg
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
      debugger;
      callback();
    })
  }

  self.sendToAll = function(msg, callback) {
    db.registrations.find(function(err, users){
      users.toArray(function(err, usersArray){
        var ids = usersArray.map(function(u){ return u.gcmId});
        self.send(ids, msg, callback);
      })
    })
  }
}

module.exports = new Notification();
