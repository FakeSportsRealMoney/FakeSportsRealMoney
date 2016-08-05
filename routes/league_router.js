'use strict';

const Router = require('express').Router;
const ErrorHandler = require('../error_handler');
const jsonParser = require('body-parser').json();
const User = require('../models/user');
const BasicHTTP = require('../lib/basic_http');
const League = require('../models/league');

let leagueRouter = module.exports = exports = Router();


// Or we can use :id rather than the leagues name
// Finds all users in the specified league
leagueRouter.get('/:name', (req, res, next) => {
  League.findOne({name:req.params.name})
    .then((league) => {
      if (!league) return ErrorHandler(400, next, 'No such league');
      league.findAllLeagueMembers().then(res.json.bind(res), ErrorHandler(401, next));
    }, ErrorHandler(404, next));
});

// These 2 get requests may have issue, unsure whether we need to call a findOne({name:req.params.name}) to find the league before calling the findAll/Overdue
leagueRouter.get('/:name/overdue', (req, res, next) => {
  League.findOne({name:req.params.name})
    .then((league) => {
      if (!league) return ErrorHandler(400, next, 'No such league');
      league.findOverdueMembers().then(res.json.bind(res), ErrorHandler(401, next));
    }, ErrorHandler(404, next));
});

leagueRouter.post('/', jsonParser, (req, res, next) => {
  (new League(req.body).newLeague.save().then(res.json.bind(res), ErrorHandler(400, next)));
});
