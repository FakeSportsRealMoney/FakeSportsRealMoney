'use strict';
const jwt = require('jsonwebtoken');
const assert = require('assert');
const User = require('../models/user');
const ErrorHandler = require('./error_handler');

module.exports = exports = function(req, res, next) {
  new Promise((resolve, reject) => {
    let authHeader = req.headers.authorization;
    assert(typeof authHeader === 'string', 'No such token provided');
    authHeader = authHeader.split(' ');
    assert(authHeader[0] === 'Bearer', 'No such token provided');
    let decoded = jwt.verify(authHeader[1], process.env.APP_SECRET);
    assert(decoded, 'Invalid token');
    User.findOne({'contact.email': decoded.idd})
      .then((user) => {
        assert(user !== null, 'Could not find User');
        req.user = user;
        next();
        resolve(user);
      }, reject);
  }).catch(ErrorHandler(401, next));
};
