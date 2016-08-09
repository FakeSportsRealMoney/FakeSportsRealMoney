'use strict';
const mongoose = require('mongoose');
const Promise = require('../lib/promise');
mongoose.Promise = Promise;
process.env.APP_SECRET = 'Secretkey';
require('./test_server');
require('./league_test');
require('./user_test');
require('./league_user_test');
process.on('exit', (code) => {
  mongoose.connection.db.dropDatabase(() => console.log('db dropped ' + code));
});
