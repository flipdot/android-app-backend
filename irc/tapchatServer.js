var util = require('util');
var ws = require('ws');
var request = require('request');

var settings = require(__dirname+'/../settings.json');
var log = require(__dirname+'/../log.js');

function TapchatServer() {
  var self = this;

  var socket = null;
  var session = null;

  self.connect = function(callback) {

    var loginReq = {
      url: settings.tapchat.httpUrl+'/chat/login',
      strictSSL: false,
      form: {
        username: settings.tapchat.user,
        password: settings.tapchat.password,
      }
    }

    request.post(loginReq, function(err, res, body){
      if(err) {
        log.err(err);
        return callback(err);
      }

      try {
        var loginResult = JSON.parse(body);
        if(!loginResult.success) {
          throw 'invalid tapchat credentials';
        }
      } catch(ex) {
        log.err(ex);
        return callback(err);
      }

      session = loginResult.session;
      initWebsockets(callback);
    })
  }

  function initWebsockets(callback) {
    var wsUrl = settings.tapchat.wsUrl+'/chat/stream?inband=true';
    var wsOptions = {
      rejectUnauthorized: false,
      headers: {
        Cookie: 'session='+session
      }
    }
    socket = new ws(wsUrl, wsOptions);
    socket.on('open', function(){
      if(callback) callback(null);
    })

    socket.on('message', function(data, flags){
      var tapchatEvent = JSON.parse(data);
      if(tapchatEvent.type === 'buffer_msg' &&
         !tapchatEvent.is_backlog){

        var ircMsg = {
          from: tapchatEvent.from,
          time: tapchatEvent.time,
          msg: tapchatEvent.msg
        }
        self.emit('newMsg', ircMsg);
      }
    })
  }
}

util.inherits(TapchatServer, require('events').EventEmitter);

module.exports = new TapchatServer();

module.exports.connect();
