function IsLocalRequestMiddleware(req, res, next) {
  if(req.connection.remoteAddress === '127.0.0.1'){
    next();
  } else {
    res.status(403).end('Nothing to see, please move on.');
  }
}

module.exports = IsLocalRequestMiddleware;
