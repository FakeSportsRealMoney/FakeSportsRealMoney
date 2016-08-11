'use strict';

const app = require('express')();
const mongoose = require('mongoose');
const morgan = require('morgan');
const Promise = require('./lib/promise');
const leagueRouter = require('./routes/league_router');
const userRouter = require('./routes/user_router');
const cronJobs = require('./lib/cron');
const sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
const PORT = process.env.PORT || 3000;

const dbPort = process.env.MONGODB_URI || 'mongodb://localhost/dev_db';
const dotenv = require('dotenv')();
dotenv.load();
mongoose.Promise = Promise;
mongoose.connect(dbPort);

app.use(morgan('dev'));
app.use('/api/league', leagueRouter);
app.use('/api/user', userRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json(err.message);
});

cronJobs.incrementDays;
cronJobs.overdueCheck;
cronJobs.veryOverdue;

app.listen(PORT, () => console.log('server up on port ' + PORT));

var inbound = {
  handler: function(req) {
    let contents = req.payload;
    let envelope;
    let to;
    if (contents.envelope) { envelope = JSON.parse(contents.envelope); }
    if (envelope) { to = envelope.from; }

    var Email = sendgrid.Email;
    let email = new Email({
      to: 'dylanjsanders1@gmail.com',
      from: to,
      subject: 'sendgrid test',
      text: 'payload was delivered'
    });

    sendgrid.send(email, (err, json) => {
      if (err) {
        console.log(err);
        request.reply({success: false, error: {message:err.message}});
      } else {
        request.reply({success:true});
      }
    });
  }
};

app.addRoute({
  method: 'POST',
  path: '/inbound',
  config: inbound
});
