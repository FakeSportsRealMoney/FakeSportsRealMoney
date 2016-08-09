'use strict';
const request = require('request');
const CronJob = require('cron').CronJob;
const twilio = require('twilio')('ACb3b6f265ae38c1c167b39b431d210785', 'ece3df3dcd39784d4114096c87554fcc');

let overdueCheck = new CronJob('20 25 23 * * *', function() {
  twilio.messages.create({
    from: '+13185624276',
    to: '+13182109880',
    body: 'You are overdue'
  }, function(err, data) {
    if (err) {
      console.log(err);
    }
    console.log(data)
  })
}, null, true, 'America/Los_Angeles');

module.exports = exports = overdueCheck;
