var tapchatServer = require(__dirname+'/tapchatServer.js');
var util = require('util');

function Irc() {
  var self = this;

  tapchatServer.connect(function(err){
    if(err) {
      return;
    }

    self.emit('connected');
  })

  self.handleGetBacklogRequest = function(req, res) {
    tapchatServer.getBacklogMessages(function(err, msgs){
      res.json(msgs);
      res.end();
    })
  }
}

util.inherits(Irc, require('events').EventEmitter);

module.exports = new Irc();
