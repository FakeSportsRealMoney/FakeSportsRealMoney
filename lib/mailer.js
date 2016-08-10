'use strict';

const nodemailer = require('nodemailer');


let transporter = module.exports = exports = nodemailer.createTransport({host: 'smtp.gmail.com', secureConnection: true, port: 465, auth: {user: 'fakesportsrealmoney@gmail.com', pass: 'Codefellows408'}});
