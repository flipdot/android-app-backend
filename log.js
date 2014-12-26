function Logger() {
  var self = this;

  self.log = function(msg) {
    console.log(msg);
  }

  self.err = function(msg) {
    console.error(msg);
  }
  self.error = self.err;

  self.warn = function(msg) {
    self.error(msg);
  }
}

module.exports = new Logger();
