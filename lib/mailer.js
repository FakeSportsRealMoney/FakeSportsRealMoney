'use strict';

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({host: 'smtp.gmail.com', secureConnection: true, port: 465, auth: {user: 'fakesportsrealmoney@gmail.com', pass: 'Codefellows408'}});

module.exports = exports = transporter;
