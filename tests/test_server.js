'use strict';

const app = require('express')();
const mongoose = require('mongoose');
const morgan = require('morgan');
const leagueRouter = require('../routes/league_router');
const userRouter = require('../routes/user_router');

mongoose.connect('mongodb://localhost/test_db');

app.use(morgan('dev'));
app.use('/api/user', userRouter);
app.use('/api/league', leagueRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode).json(err.message);
});

app.listen(5000);
