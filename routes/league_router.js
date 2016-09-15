'use strict';

const Router = require('express').Router;
const ErrorHandler = require('../lib/error_handler');
const jsonParser = require('body-parser').json();
const League = require('../models/league');

let leagueUserRouter = require('./league_user_router');
let leagueRouter = module.exports = exports = Router();

leagueRouter.get('/:id', (req, res, next) => {
  let handleDbError = ErrorHandler(400, next, 'invalid name');
  let handleNotFound = ErrorHandler(404, next, 'Not Found');
  //I would probably do this inline rather than set them to variables makes the code a little cleaner
  League.findOne({'_id':req.params.id}).then((league) => {
    if (!league) return handleNotFound();
    res.json(league);
  }, handleDbError);
});

leagueRouter.get('/', (req, res, next) => {
  League.find().then(res.json.bind(res), ErrorHandler(500, next, 'Server Error'));
});

leagueRouter.post('/', jsonParser, (req, res, next) => {
  (new League(req.body).save().then(res.json.bind(res), ErrorHandler(400, next, 'Bad request')));
});

leagueRouter.put('/:id', jsonParser, (req, res, next) => {
  let _id = req.params.id;
  League.findOneAndUpdate({_id}, req.body, (err) => {
    if (err) return ErrorHandler(404, next, 'League not found');
    res.status(200).json('Success');
  });
});

leagueRouter.delete('/:id', (req, res, next) => {
  League.findOneAndRemove({'_id':req.params.id}).then((league) => {
    if (!league) return ErrorHandler(404, next, 'League not found');
    res.status(200).json('Success');
  }, ErrorHandler(404, next, 'League not found'));
});

leagueRouter.use('/:leagueId/user', leagueUserRouter);
