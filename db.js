var settings = require(__dirname+'/settings.json');
var MongoClient = require('mongodb').MongoClient

function Db() {
  var self = this;

  MongoClient.connect(settings.db.url, function(err, db){
    setupCollections(db);

    if(!settings.db.username){
      self.emit('connected');
      return;
    }

    db.authenticate(
      settings.db.user,
      settings.db.password,
      function(err, result){
        self.emit('connected');
      })
  })

  function setupCollections(db) {
    self.registrations = db.collection('registrations');
  }
}

require('util').inherits(Db, require('events').EventEmitter);

module.exports = new Db();
