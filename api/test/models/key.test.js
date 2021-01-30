const mongoose = require('mongoose');
const dbHandler = require('../db-handler');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Key = require('../../src/models/key');

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('key model', () => {
  it('should be invalid if key is empty', async () => {
    let key = new Key();

    key.validate(err => {
      expect(err.errors.key).toBeInstanceOf(mongoose.Error.ValidatorError);
    });
  });

  it('should be valid with string key', async () => {
    let key = new Key();

    key.key = 'secret';

    key.validate(err => {
      expect(err).toBeNull();
    });
  });
});
