'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const request = chai.request;
const User = require('../models/user');
const baseUrl = 'localhost:5000/api/user';
chai.use(chaiHttp);

describe('User CRUD tests', function() {
  it('Should create a new user', function(done) {
    request(baseUrl)
      .post('/')
      .send({name: 'testUser', overdue: true, amountDue: 50, contact: {phone: '555', email: 'test@test.com'}, role: 'basic'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.status).to.eql(200);
        done();
      });
  });

  describe('adding user to db and testing', function() {
    let user;
    before(function(done) {
      user = User({name: 'User1', overdue: true, amountDue: 500, contact: {phone: '5551', email: 'test1@test.com'}, role: 'basic'});
      user.save().then((userData) => {
        this.user = userData;
        done();
      }, (err) => {throw err;
      });
    });

    it('Should GET User1', function(done) {
      request(baseUrl)
        .get('/' + user._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('_id');
          expect(res.body.name).to.eql('User1');
          done();
        });
    });

    it('Should GET all users', function(done) {
      request(baseUrl)
        .get('/')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });

    it('Should update User1', function(done) {
      user.overdue = false;
      request(baseUrl)
        .put('/' + user._id)
        .send({overdue: false})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });

    it('should DELETE a user', function(done) {
      request(baseUrl)
      .delete('/' + user._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
    });

    it('Bad GET request that should get an error', function(done) {
      request(baseUrl)
      .get('/badrequest')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res.status).to.eql(400);
        expect(err.message).to.eql('Bad Request');
        done();
      });
    });

    it('Should give a bad POST request', function(done) {
      request(baseUrl)
      .post('/')
      .send({name: 'testUser', overdue: true, amountDue: 50, role: 'basic'})
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res.status).to.eql(400);
        expect(res.body).to.eql('Bad request');
        done();
      });
    });

    it('should give a bad DELETE request', function(done) {
      request(baseUrl)
        .delete('/fakeIdHere')
        .end((err, res) => {
          expect(err).to.not.eql(null);
          expect(res.status).to.eql(400);
          done();
        });
    });
  });
});
