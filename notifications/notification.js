var request = require('request');
var db = require(__dirname+'/../db');
var settings = require(__dirname+'/../settings');
var log = require(__dirname+'/../log');
var util = require(__dirname+'/../util');

function Notification() {
  var self = this;

  util.addMethod(self, "send", function(receiverIds, action, params, callback) {
    sendInternal(receiverIds, action, params, {}, callback);
  });

  util.addMethod(self, "send", function(receiverIds, action, params, sendOptions, callback) {
    sendInternal(receiverIds, action, params, sendOptions, callback);
  });

  util.addMethod(self, "sendToAll", function(action, params, callback) {
    sendToAllInternal(action, params, {}, callback);
  });

  util.addMethod(self, "sendToAll", function(action, params, sendOptions, callback) {
    sendToAllInternal(action, params, sendOptions, callback);
  });

  function sendToAllInternal(action, params, sendOptions, callback) {
    db.registrations.find(function(err, users){
      if(err) throw err;
      users.toArray(function(err, usersArray){
        if(err) throw err;

        var ids = usersArray.map(function(u){ return u.gcmId});
        sendInternal(ids, action, params, sendOptions, callback);
      })
    })
  }

  function sendInternal(receiverIds, action, params, sendOptions, callback) {
    var gcmUrl = 'https://android.googleapis.com/gcm/send';
    var req = {
      registration_ids: receiverIds,
      time_to_live: sendOptions.timeToLive,
      delay_while_idle: sendOptions.delayWhileIdle,
      collapse_key: sendOptions.collapseKey,
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

      if(callback) callback();
    })
  }
}

module.exports = new Notification();
