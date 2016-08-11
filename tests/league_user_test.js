'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const baseUrl = 'localhost:5000/api/league';
const League = require('../models/league');

describe('testing with league and user', function() {
  let testLeague;
  let testUser = {name: 'testUser', overdue: true, amountDue: 200, contact: {phone: '8675309', email: 'whatever@email.org'}};
  before(function(done) {
    testLeague = new League({name: 'testLeague'});
    testLeague.save().then((leagueData) => {
      this.league = leagueData;
      done();
    }, (err) => {throw err;});
  });

  it('should post a new member to the league', function(done) {
    request(baseUrl)
      .post('/' + testLeague._id + '/user')
      .send(testUser)
      .end(function(err, res) {
        testUser._id = res.body._id.toString();
        console.log(testUser);
        expect(err).to.eql(null);
        expect(res.body.leagueId).to.eql(testLeague._id.toString());
        done();
      });
  });

  it('get all users from the league', function(done) {
    request(baseUrl)
      .get('/' + testLeague._id + '/user')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body[0].name).to.eql('testUser');
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('should update a user', function(done) {
    request(baseUrl)
      .put('/' + testLeague._id + '/user/' + testUser._id)
      .send({amountDue: 100})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.name).to.eql('testUser');
        done();
      });
  });

  it('should delete the user from the league', function(done) {
    request(baseUrl)
      .delete('/' + testLeague._id + '/user/' + testUser._id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('Should give a bad POST request', function(done) {
    request(baseUrl)
    .post('/' + testLeague._id + '/user')
    .send({name: 'testUser', overdue: true, amountDue: 200})
    .end((err, res) => {
      expect(err).to.not.eql(null);
      expect(res.status).to.eql(400);
      expect(res.body).to.eql('Bad request');
      done();
    });
  });

  it('should give a bad DELETE request', function(done) {
    request(baseUrl)
      .delete('/' + testLeague.id + '/user/fakeUserId')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res.status).to.eql(404);
        done();
      });
  });
});
