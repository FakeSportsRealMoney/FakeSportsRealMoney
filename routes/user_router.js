'use strict';

const Router = require('express').Router;
const ErrorHandler = require('../lib/error_handler');
const jsonParser = require('body-parser').json();
const User = require('../models/user');

let userRouter = module.exports = exports = Router();

userRouter.post('/', jsonParser, (req, res, next) => {
  User(req.body).save().then(res.json.bind(res), ErrorHandler(400, next, 'Bad request'));
});

userRouter.get('/', (req, res, next) => {
  User.find().then(res.json.bind(res), ErrorHandler(500, next, 'Server Error'));
});

userRouter.get('/:id', (req, res, next) => {
  User.findOne({'_id': req.params.id}).then((user) => {
    if (!user) return ErrorHandler(404, next)(new Error('Invalid user'));
    res.json(user);
  }, ErrorHandler(400, next));
});

userRouter.delete('/:id', (req, res, next) => {
  User.findOneAndRemove({'_id': req.params.id}).then((user) => {
    if(!user) return ErrorHandler(404, next, 'User not found');
    res.json('Success');
  }, ErrorHandler(400, next));
});

userRouter.put('/:id', jsonParser, (req, res, next) => {
  User.update({_id: req.params.id}, {$set: req.body}).then(res.json.bind(res),ErrorHandler(500, next, 'Server Error'));
});
