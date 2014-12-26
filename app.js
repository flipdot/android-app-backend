var PORT = 47007;
var HOST = "0.0.0.0";

var express = require('express')
var db = require(__dirname+'/db');

db.on('connected', startWebserver);

function startWebserver() {
  var app = express()

  app.get('/', function (req, res) {
    res.redirect('https://play.google.com/store/apps/details?id=org.flipdot.flipdotapp')
  })

  var server = app.listen(PORT, HOST, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)
  })
}
