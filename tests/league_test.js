'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.request;
const baseUrl = 'localhost:5000/api';
const League = require('../models/league');

describe('league CRUD tests', function() {
  it('should create a league', function(done) {
    request(baseUrl)
      .post('/')
      .send()
      done();
  });
});
