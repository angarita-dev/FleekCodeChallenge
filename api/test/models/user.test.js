const mongoose = require('mongoose');
const dbHandler = require('../db-handler');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../src/models/user');

const mongoServer = new MongoMemoryServer();

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe('User model', () => {
  it('should be invalid if email is empty', async () => {
    let user = new User();

    user.validate(err => {
      expect(err.errors.email).toBeInstanceOf(mongoose.Error.ValidatorError)
    });
  });

  it('should be invalid if password is empty', async () => {
    let user = new User();

    user.validate(err => {
      expect(err.errors.password).toBeInstanceOf(mongoose.Error.ValidatorError)
    });
  });

  it('should be valid with password and string', async () => {
    let user = new User();

    user.email = 'test@email.com';
    user.password = 'securepassword';

    user.validate(err => {
      expect(err).toBeNull;
    });
  });
});
