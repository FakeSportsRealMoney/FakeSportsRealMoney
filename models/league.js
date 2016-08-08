'use strict';

const mongoose = require('mongoose');
const User = require('./user');

let leagueSchema = mongoose.Schema({
  name: {type: String, unique: true, required: true},
  sport: {type: String, default: 'Football'}
});

leagueSchema.methods.addUser = function(userData) {
  let user = new User(userData);
  user.leagueId = this._id;
  return user.save();
};


// Need to set what gets updated either here or on the return call
leagueSchema.methods.updateUser = function(userId) {
  return User.findOneAndUpdate({'_id':userId});
};

leagueSchema.methods.removeUser = function(userId) {
  return User.findOneAndUpdate({'_id': userId}, {leagueId: null});
};

leagueSchema.methods.findAllLeagueMembers = function() {
  return User.find({leagueId: this._id});
};

leagueSchema.methods.findOverdueMembers = function() {
  return User.find({leagueId: this.id, overdue: true});
};

module.exports = exports = mongoose.model('league', leagueSchema);
