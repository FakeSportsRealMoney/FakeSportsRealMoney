'use strict';

const userRouter = require('../routes/user_router');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const request = chai.request;
const User = require('../models/user');
const baseUrl = 'localhost:5000/api/user'
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
        .get('/User1')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body).to.have.property('_id');
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
        .put('/' + user.name)
        .send(user)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.status).to.eql(200);
          expect(res.body.message).to.eql('Success');
          done();
        });
    });
    it('should DELETE a user', function(done) {
      request(baseUrl)
        .delete('/' + user.name)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.status).to.eql(200);
          expect(res.body.message).to.eql('Success');
          done();
        });
    });
  });
});
