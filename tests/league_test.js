'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const baseUrl = 'localhost:5000/api';
const League = require('../models/league');

describe('league CRUD tests', function() {
  it('should create a league', function(done) {
    request(baseUrl)
      .post('/')
      .send({name: 'fakeLeague'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.be(res);
        done();
      });
  });
});
