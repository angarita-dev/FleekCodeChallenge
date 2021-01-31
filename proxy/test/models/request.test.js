const mongoose = require('mongoose');
const dbHandler = require('../util/db-handler');

const Request = require('../../src/models/request');

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('request model', () => {
  it('should be invalid if path is empty', async () => {
    let request = new Request();

    expect(request.path).toEqual(
      expect.stringMatching('') 
    );
  });

  it('should be invalid if httpMethod is empty', async () => {
    let request = new Request();

    expect(request.httpMethod).toEqual(
      expect.stringMatching('') 
    );
  });

  it('should be invalid if startTime is empty', async () => {
    let request = new Request();

    expect(request.startTime).toEqual(
      expect.stringMatching('') 
    );
  });


  it('should be valid with required parameters', async () => {
    let request = new Request();
    
    request.path = 'api/path/test';
    request.httpMethod = 'POST';
    request.startTime = '2021-01-31T07:27:24.684Z';

    request.validate(err => {
      expect(err).toBeNull();
    });
  });
});
