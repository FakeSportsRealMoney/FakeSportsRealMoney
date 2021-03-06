'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const baseUrl = 'localhost:5000/api/league';
const League = require('../models/league');

describe('league CRUD tests', function() {
  it('should create a league', function(done) {
    request(baseUrl)
      .post('/')
      .send({name: 'fakeLeague'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('fakeLeague');
        expect(res.body.sport).to.eql('Football');
        done();
      });
  });

  describe('with a league in db', function() {
    let newLeague;
    before(function(done) {
      newLeague = new League({name: 'testLeague'});
      newLeague.save().then((leagueData) => {
        this.league = leagueData;
        done();
      }, (err) => {
        throw err;
      });
    });

    it('should get league with name testLeague', function(done) {
      request(baseUrl)
        .get('/' + newLeague._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.name).to.eql('testLeague');
          expect(res.body.sport).to.eql('Football');
          expect(res.body).to.have.property('_id');
          done();
        });
    });

    it('Bad GET request should error', function(done) {
      request(baseUrl)
        .get('/badrequest')
        .end(function(err, res) {
          expect(err.status).to.eql(400);
          expect(err.message).to.eql('Bad Request');
          expect(res).to.have.property('body');
          done();
        });
    });

    it('should post a league', function(done) {
      request(baseUrl)
        .post('/')
        .send({name: 'test2'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.status).to.eql(200);
          expect(res.body.name).to.eql('test2');
          expect(res.body).to.have.property('_id');
          done();
        });
    });

    it('should update testleague', function(done) {
      newLeague.sport = 'soccer';
      request(baseUrl)
        .put('/' + newLeague._id)
        .send({sport: 'soccer'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should remove testLeague', function(done) {
      request(baseUrl)
        .delete('/' + newLeague._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });

    it('Should give a bad POST request', function(done) {
      request(baseUrl)
      .post('/')
      .send({sport:'golf'})
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
          expect(res.status).to.eql(404);
          done();
        });
    });
  });
});
