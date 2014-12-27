var notification = require(__dirname+'/notification');

function UpdateSpaceStatus() {
  var self = this;

  self.handleSpaceStatusChange = function(req, res) {
    var newStatus = req.rawBody;
  }
}

module.exports = new UpdateSpaceStatus();
