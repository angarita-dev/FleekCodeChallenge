let expect = require('chai').expect;

let User = require('../../src/models/User');

describe('user model', () => {
  it('should be invalid if email is empty', (done) => {
    let user = new User();

    user.validate(err => {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it('should be invalid if password is empty', (done) => {
    let user = new User();

    user.validate(err => {
      expect(err.errors.password).to.exist;
      done();
    });
  });

  it('should be valid with password and string', (done) => {
    let user = new User();

    user.email = 'test@email.com';
    user.password = 'securepassword';

    user.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });
});
