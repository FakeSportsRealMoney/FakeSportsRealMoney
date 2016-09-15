'use strict';

const app = require('express')();
const mongoose = require('mongoose');
const morgan = require('morgan');
const Promise = require('./lib/promise');
//you can probably just promise for this I don't imagine you'll ever need to run your server
//on an old version of node
const leagueRouter = require('./routes/league_router');
const userRouter = require('./routes/user_router');
const cronJobs = require('./lib/cron');
const PORT = process.env.PORT || 3000;

const dbPort = process.env.MONGODB_URI || 'mongodb://localhost/dev_db';
mongoose.Promise = Promise;
mongoose.connect(dbPort);

app.use(morgan('dev'));
//you might want to read this from process.NODE_ENV or something similar and default to dev if
//it doesn't exist
app.use('/api/league', leagueRouter);
app.use('/api/user', userRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json(err.message);
});

//none of these are doing anything, you actually create the start of these processes when you require in the cronJobs file
//I would either wrap them in a function or get rid of these lines.
cronJobs.incrementDays;
cronJobs.overdueCheck;
cronJobs.veryOverdue;

app.listen(PORT, () => console.log('server up on port ' + PORT));
