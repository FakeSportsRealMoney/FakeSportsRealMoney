'use strict';

const Router = require('express').Router;
const User = require('../models/user');
const ErrorHandler = require('../lib/error_handler');
const jsonParser = require('body-parser').json();
const BasicHTTP = require('../lib/basic_http');

let authRouter = module.exports = exports = Router();

authRouter.get('/signin', BasicHTTP, (req, res, next) => {
  let authError = ErrorHandler(401, next, 'Authenication Error');
  User.findOne({name: req.auth.name})
    .then((user) => {
      if (!user) return authError(new Error('No such user'));
      user.comparePassword(req.auth.password);
    });
});
