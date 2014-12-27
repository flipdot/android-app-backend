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
    notification.sendToAll('spaceStatusChanged', params);

    res.end('ok');
  }
}

module.exports = new UpdateSpaceStatus();
