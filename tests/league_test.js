'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const baseUrl = 'localhost:5000/api/league';
const League = require('../models/league');
const mongoose = require('mongoose');

describe('league CRUD tests', function() {
  before(function(done) {
    request(baseUrl)
      .post('/')
      .send({name: 'fakeLeague'})
      .end((err, res) => {
        expect(err).to.eql(null);
        done();
      });
  });

  describe('with a league in db', function() {
    let newLeague;
    before(function(done) {
      newLeague = League({name: 'testLeague'});
      newLeague.save().then((leagueData) => {
        this.league = leagueData;
        done();
      }, (err) => {
        throw err;
      });
    });

    it('should get league with name testLeague', function(done) {
      request(baseUrl)
        .get('/testLeague/')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.name).to.eql('testLeague');
          expect(res.body.sport).to.eql('Football');
          expect(res.body).to.have.property('_id');
          done();
        });
    });

    it('should respond with an error', function(done) {
      request(baseUrl)
        .get('/badrequest/')
        .end(function(err, res) {
          expect(err).to.not.eql(null);
          expect(err.message).to.eql('Internal Server Error');
          expect(res.status).to.eql(500);
          done();
        });
    });

    it('should post a league', function(done) {
      request(baseUrl)
        .post('/')
        .send({name: 'test2'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.name).to.eql('test2');
          expect(res.body).to.have.property('_id');
          done();
        });
    });

    it('should update testleague', function(done) {
      newLeague.sport = 'soccer';
      request(baseUrl)
        .put('/' + newLeague.name)
        .send(newLeague)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res).to.have.property('body');
          done();
        });
    });

    it('should remove testLeague', function(done) {
      request(baseUrl)
        .delete('/' + newLeague.name)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.status).to.eql(200);
          expect(res.body.message).to.eql('Success');
          done();
        });
    });
  });
});
