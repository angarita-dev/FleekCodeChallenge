let expect = require('chai').expect;

let Key = require('../../src/models/key');

describe('key model', () => {
  it('should be invalid if key is empty', (done) => {
    let key = new Key();

    key.validate(err => {
      expect(err.errors.key).to.exist;
      done();
    });
  });

  it('should be valid with string key', (done) => {
    let key = new Key();

    key.key = 'secret';

    key.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });
});
