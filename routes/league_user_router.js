'use strict';

const express = require('express');
const League = require('../models/league');
const jsonParser = require('body-parser').json();
const ErrorHandler = require('../lib/error_handler');

let leagueUserRouter = module.exports = exports = express.Router({mergeParams: true});

let findLeague = function(req, res, next) {
  League.findOne({'_id': req.params.leagueId}).then((league) => {
    if (!league) return ErrorHandler(404, next, 'League does not exist');
    req.league = league;
    next();
  }, ErrorHandler(404, next, 'League does not exist'));
};

leagueUserRouter.get('/', findLeague, (req, res, next) => {
  req.league.findAllLeagueMembers().then(res.json.bind(res), ErrorHandler(500, next, 'Server Error'));
});

leagueUserRouter.get('/overdue', findLeague, (req, res, next) => {
  req.league.findOverdueMembers().then(res.json.bind(res), ErrorHandler(500, next, 'Server Error'));
});

leagueUserRouter.post('/', jsonParser, findLeague, (req, res, next) => {
  req.league.addUser(req.body).then(res.json.bind(res), ErrorHandler(400, next, 'Bad request'));
});

leagueUserRouter.put('/:id', jsonParser, findLeague, (req, res, next) => {
  req.league.updateUser(req.params.id, req.body).then(res.json.bind(res), ErrorHandler(404, next, 'No such user'));
});

leagueUserRouter.get('/:id/increment', findLeague, (req, res, next) => {
  req.league.incrementDays(req.params.id).then(res.json.bind(res), ErrorHandler(404, next, 'No such user'));
});

leagueUserRouter.delete('/:id', findLeague, (req, res, next) => {
  req.league.removeUser(req.params.id).then(res.json.bind(res), ErrorHandler(404, next, 'No such user'));
});
