var PORT = 47007;
var HOST = "0.0.0.0";

var express = require('express')
var bodyParser = require('body-parser')
var db = require(__dirname+'/db');
var isLocalRequest = require(__dirname+'/middleware/isLocalRequestMiddleware');
var registration = require(__dirname+'/notifications/registration');
var updateSpaceStatus = require(__dirname+'/notifications/updateSpaceStatus');
var irc = require(__dirname+'/irc/irc');

db.on('connected', function(){
  irc.on('connected', function(){
    startWebserver();
  })
});

function startWebserver() {
  var app = express()
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.get('/', function (req, res) {
    res.redirect('https://play.google.com/store/apps/details?id=org.flipdot.flipdotapp')
  })

  app.get('/irc/backlog', function (req, res) {
    irc.handleGetBacklogRequest(req, res);
  })

  app.post('/registerClient', function (req, res) {
    registration.handleRegistrationRequest(req, res);
  })

  app.post('/updateSpaceStatus', isLocalRequest, function (req, res) {
    updateSpaceStatus.handleSpaceStatusChange(req, res);
  })

  var server = app.listen(PORT, HOST, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)
  })
}
