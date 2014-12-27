var notification = require(__dirname+'/notification');

function UpdateSpaceStatus() {
  var self = this;

  self.handleSpaceStatusChange = function(req, res) {
    var newStatus;
    switch(req.rawBody) {
      case 'open': {
        newStatus = 'open';
        break;
      }
      case 'close': {
        newStatus = 'close';
        break;
      }
      default: {
        res.status(400).end('invalid space state')
        return;
      }
    }

    var params = { newStatus: newStatus };
    var timeToLive = 60 * 60 * 3; // 3h
    notification.sendToAll('spaceStatusChanged', params, { timeToLive: timeToLive });

    res.end('ok');
  }
}

module.exports = new UpdateSpaceStatus();
