'use strict';
const request = require('request');
const CronJob = require('cron').CronJob;
const twilio = require('twilio')('ACb3b6f265ae38c1c167b39b431d210785', 'ece3df3dcd39784d4114096c87554fcc');
let localUrl = 'http://localhost:3000/api/league/';
let herokuUrl = 'https://fake-sports-real-money.herokuapp.com/api/league';

let overdueCheck = new CronJob('00 30 15 * * *', function() {
  request(herokuUrl, (err, response, html) => {
    let league = JSON.parse(response.body);
    league.forEach((league) => {
      request(herokuUrl + league._id + '/user/overdue', (err,   response, html) => {
        let overdueMembers = JSON.parse(response.body);
        overdueMembers.forEach((member) => {
          twilio.messages.create({
            from: '+13185624276',
            to: member.contact.phone,
            body: 'You are overdue by ' + member.amountDue
          }, function(err, data) {
            if (err) {
              console.log(err);
            }
            console.log('sent');
          });
        });
      });
    });
  });
}, null, true, 'America/Los_Angeles');

module.exports = exports = overdueCheck;
