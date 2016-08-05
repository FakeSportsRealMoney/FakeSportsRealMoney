'use strict';

const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  name: {type: String, required: true},
  overdue: {type: Boolean, required: true, default: true},
  amountDue: Number,
  contact: {
    phone: {type: String, required: true},
    email: {type: String, required: true}
  },
  leagueId: String,
  role: {type: String, default: 'basic'}
});

module.exports = exports = mongoose.model('user', userSchema);
