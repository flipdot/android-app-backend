function IsLocalRequestMiddleware(req, res, next) {
  if(req.headers['x-forwarded-server']){
    res.status(403).end('Nothing to see, please move on.');
  } else {
    next();
  }
}

module.exports = IsLocalRequestMiddleware;
