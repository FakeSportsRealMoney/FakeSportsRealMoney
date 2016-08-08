'use strict';

const Router = require('express').Router;
const ErrorHandler = require('../lib/error_handler');
const jsonParser = require('body-parser').json();
const League = require('../models/league');

let leagueUserRouter = require('./league_user_router');
let leagueRouter = module.exports = exports = Router();


// Or we can use :id rather than the leagues name
// Finds all users in the specified league
leagueRouter.get('/:name', (req, res, next) => {
  let handleDbError = ErrorHandler(400, next, 'invalid name');
  let handleNotFound = ErrorHandler(404, next, 'Not Found');
  League.findOne({name:req.params.name}).then((league) => {
    if (!league) return handleNotFound();
    res.json(league);
  }, handleDbError);
});

leagueRouter.get('/', (req, res, next) => {
  League.find().then(res.json.bind(res), ErrorHandler(500, next, 'Server Error'));
});

leagueRouter.post('/', jsonParser, (req, res, next) => {
  (new League(req.body).save().then(res.json.bind(res), ErrorHandler(400, next)));
});

leagueRouter.put('/:name', jsonParser, (req, res, next) => {
  let name = req.params.name;
  League.findOneAndUpdate({name}, req.body, (err) => {
    if (err) return ErrorHandler(404, next, 'League not found');
    res.status(200).json('Success');
  });
});

leagueRouter.delete('/:name', (req, res, next) => {
  let name = req.params.name;
  League.findOneAndRemove({name}, (err) => {
    if (err) return ErrorHandler(404, next, 'League not found');
    res.status(200).json('Success');
  });
});

leagueRouter.use('/:leagueId/user', leagueUserRouter);
