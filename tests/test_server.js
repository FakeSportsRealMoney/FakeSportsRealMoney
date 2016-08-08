'use strict';

let app = require('express')();
const mongoose = require('mongoose');
const Promise = require('../lib/promise');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/test_db');
const morgan = require('morgan');
const leagueRouter = require('../routes/league_router');
const userRouter = require('../routes/user_router');

app.use(morgan('dev'));
app.use('/api/league', leagueRouter);
app.use('/api/user', userRouter);



app.use((err, req, res, next) => {
  res.status(err.statusCode).json(err.message);
});



app.listen(5000);
