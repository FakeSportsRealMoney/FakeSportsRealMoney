'use strict';
const ErrorHandler = require('../lib/error_handler.js');
const assert = require('assert');

module.exports = function(roles) {
  return function(req, res, next) {
    new Promise((resolve, reject) => {
      assert(req.user, 'No Current User');
      if (req.user.role === 'admin') {
        next();
        return resolve();
      }
      assert(roles.indexOf(req.user.role) !== -1, 'Unauthorized');
      resolve();
    }).catch(ErrorHandler(401, next));
  };
};
