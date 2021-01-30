const { validateRemoveInput } = require("../../src/validators/key");

describe('key validator', () => {
  describe('remove', () => {
    it('should add error for key when not present', () => {
      const { errors, isValid } = validateRemoveInput({});

      expect(errors.key).toExist;
    });

    it('should equal error message for key when not present', () => {
      const { errors, isValid } = validateRemoveInput({});

      expect(errors.key).toEqual(
        expect.stringMatching('Key field is required')
      )
    });

    it('should not be valid without string key', () => {
      const { errors, isValid } = validateRemoveInput({});

      expect(isValid).toBeFalse;
    });
  });
});
