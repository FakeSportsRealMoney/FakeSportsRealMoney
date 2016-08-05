'use strict';

const app = require('express')();
const mongoose = require('mongoose');
const morgan = require('morgan');
const Promise = require('./lib/promise');
const leagueRouter = require('./routes/league_router');
const userRouter = require('./routes/user_router');
const PORT = process.env.PORT || 3000;

const dbPort = process.env.MONGODB_URI || 'mongodb://localhost/dev_db';
mongoose.Promise = Promise;
mongoose.connect(dbPort);

app.use(morgan('dev'));
app.use('/api/league', leagueRouter);
app.use('/api/user', userRouter);

app.use((req, res, next, err) => {
  res.status(err.statusCode || 500).json(err.message);
});

app.listen(PORT, () => console.log('server up on port ' + PORT));
