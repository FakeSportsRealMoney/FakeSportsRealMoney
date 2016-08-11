'use strict';
const request = require('request');
const CronJob = require('cron').CronJob;
const twilio = require('twilio')('ACb3b6f265ae38c1c167b39b431d210785', 'ece3df3dcd39784d4114096c87554fcc');
const transporter = require('./mailer');

let localUrl = 'http://localhost:3000/api/league/';
let herokuUrl = 'https://fake-sports-real-money.herokuapp.com/api/league/';

const cronJobs = {};

cronJobs.overdueCheck = new CronJob('00 30 15 * * *', function() {
  request(herokuUrl, (err, response, html) => {
    let leagues = JSON.parse(response.body);
    leagues.forEach((league) => {
      request(herokuUrl + league._id + '/user/overdue', (err, response, html) => {
        let overdueMembers = JSON.parse(response.body);
        overdueMembers.forEach((member) => {
          twilio.messages.create({
            from: '+13185624276',
            to: member.contact.phone,
            body: 'Hi ' + member.name + '. You are overdue on your fantasy football dues by ' + member.amountDue + '. To stop receiving these notifications, pay your league dues.'
          }, function(err, data) {
            if (err) {
              console.log(err);
            }
            console.log('sent: ' + data);
          });
          let mailOptions = {
            from: 'The Commissioner <fakesportsrealmoney@gmail.com>',
            to: member.contact.email,
            subject: 'Fantasy Football Dues',
            text: 'You owe ' + member.amountDue + ' to your fantasy football league. To stop receiving these notifications, pay your league dues.',
            html: '<p>You owe ' + member.amountDue + ' to your fantasy football league. To stop receiving these notifications, pay your league dues.</p>'
          };
          transporter.sendMail(mailOptions, function(err, data) {
            if (err) console.log(err);
            console.log('Message Sent: ' + data.response);
          });
        });
      });
    });
  });
}, null, true, 'America/Los_Angeles');

cronJobs.incrementDays = new CronJob('35 23 00 * * *', function() {
  request(herokuUrl, (err, response, html) => {
    let leagues = JSON.parse(response.body);
    leagues.forEach((league) => {
      request(herokuUrl + league._id + '/user/overdue', (err, response, html) => {
        let overdueMembers = JSON.parse(response.body);
        overdueMembers.forEach((member) => {
          request(herokuUrl + member.leagueId + '/user/' + member._id + '/increment', (err, response, html) => {
          });
        });
      });
    });
  });
}, null, true, 'America/Los_Angeles');

cronJobs.veryOverdue = new CronJob('00 30 4 * * *', function() {
  request(herokuUrl, (err, response, html) => {
    let leagues = JSON.parse(response.body);
    leagues.forEach((league) => {
      request(herokuUrl + league._id + '/user/overdue', (err, response, html) => {
        let overdueMembers = JSON.parse(response.body);
        overdueMembers.forEach((member) => {
          if (member.daysOverdue > 5) {
            twilio.messages.create({
              from: '+13185624276',
              to: member.contact.phone,
              body: 'Hi ' + member.name + '. You are overdue on your fantasy football dues by ' + member.amountDue + '. To stop receiving these notifications, pay your league dues.'
            }, function(err, data) {
              if (err) {
                console.log(err);
              }
              console.log('sent: ' + data);
            });
            let mailOptions = {
              from: 'The Commissioner <fakesportsrealmoney@gmail.com>',
              to: member.contact.email,
              subject: 'Fantasy Football Dues',
              text: 'You owe ' + member.amountDue + ' to your fantasy football league. To stop receiving these notifications, pay your league dues.',
              html: '<p>You owe ' + member.amountDue + ' to your fantasy football league. To stop receiving these notifications, pay your league dues.</p>'
            };
            transporter.sendMail(mailOptions, function(err, data) {
              if (err) console.log(err);
              console.log('Message Sent: ' + data.response);
            });
          }
        });
      });
    });
  });
}, null, true, 'America/Los_Angeles');

module.exports = exports = cronJobs;
