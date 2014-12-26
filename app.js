var PORT = 47007;
var HOST = "0.0.0.0";

var express = require('express')
var bodyParser = require('body-parser')
var db = require(__dirname+'/db');
var registration = require(__dirname+'/notifications/registration');

db.on('connected', startWebserver);

function startWebserver() {
  var app = express()
  app.use(bodyParser.json())

  app.get('/', function (req, res) {
    res.redirect('https://play.google.com/store/apps/details?id=org.flipdot.flipdotapp')
  })

  app.post('/registerClient', function (req, res) {
    registration.handleRegistrationRequest(req, res);
  })

  var server = app.listen(PORT, HOST, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)
  })
}
