'use strict';

const nodemailer = require('nodemailer');


let transporter = module.exports = exports = nodemailer.createTransport({host: 'smtp.gmail.com', secureConnection: true, port: 465, auth: {user: 'fakesportsrealmoney@gmail.com', pass: 'Codefellows408'}});

let mailOptions = {
  from: 'The Commissioner <fakesportsrealmoney@gmail.com>',
  to: 'keiranbeaton@gmail.com',
  subject: 'Fantasy Football dues',
  text: 'You owe money for fantasy football, dumbass',
  html: '<p>You owe money for fantasy football, dumbass</p>'
};

transporter.sendMail(mailOptions, function(error, info) {
  if(error){
    console.log(error);
  } else {
    console.log('Message sent: ' + info.response);
  }
});
