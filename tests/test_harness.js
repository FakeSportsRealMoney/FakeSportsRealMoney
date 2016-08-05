'use strict';

process.env.APP_SECRET = 'Secretkey';
require('./test_server');
require('./league_test');
const mongoose = require('mongoose');
process.on('exit', (code) => {
  mongoose.connection.db.dropDatabase(() => console.log('db dropped ' + code));
});
