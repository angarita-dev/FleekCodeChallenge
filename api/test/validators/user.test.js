const {
  validateLoginInput,
  validateRegisterInput
} = require("../../src/validators/user");

describe('user validator', () => {
  describe('login', () => {
    it('should add error for email when not present', () => {
      const password = 'securestring';
      const { errors, isValid } = validateLoginInput({password});

      expect(isValid).toBeFalse;
      expect(errors.email).toEqual(
        expect.stringMatching('Email field is required')
      );
    });

    it('should add error for email when not valid', () => {
      const email = 'random_string';
      const password = 'securestring';
      const { errors, isValid } = validateLoginInput({email, password});

      expect(isValid).toBeFalse;
      expect(errors.email).toEqual(
        expect.stringMatching('Email is invalid')
      );
    });

    it('should add error for password when not present', () => {
      const email = 'email@test.com';
      const { errors, isValid } = validateLoginInput({email});

      expect(isValid).toBeFalse;
      expect(errors.password).toEqual(
        expect.stringMatching('Password field is required')
      );
    });

    it('should be valid when email and password are present', () => {
      const email = 'email@test.com';
      const password = 'securestring';
      const { errors, isValid } = validateLoginInput({email, password});

      expect(isValid).toBeTrue;
      expect(errors).toBeEmpty;
    });
  });

  describe('register', () => {
    it('should add error for email when not present', () => {
      const password = 'securestring';
      const password2 = 'securestring';
      const { errors, isValid } = validateRegisterInput(
        {
          password,
          password2
        });

      expect(isValid).toBeFalse;
      expect(errors.email).toEqual(
        expect.stringMatching('Email field is required')
      );
    });

    it('should add error for email when not valid', () => {
      const email = 'random_string';
      const password = 'securestring';
      const password2 = 'securestring';
      const { errors, isValid } = validateRegisterInput(
        {
          email,
          password,
          password2
        });

      expect(isValid).toBeFalse;
      expect(errors.email).toEqual(
        expect.stringMatching('Email is invalid')
      );
    });

    it('should add error for password when not present', () => {
      const email = 'email@test.com';
      const password2 = 'securestring';
      const { errors, isValid } = validateRegisterInput(
        {
          email,
          password2
        });

      expect(isValid).toBeFalse;
      expect(errors.password).toEqual(
        expect.stringMatching('Password field is required')
      );
    });

    it('should add error for password when not long enough', () => {
      const email = 'email@test.com';
      const password = '123';
      const password2 = '123';
      const { errors, isValid } = validateRegisterInput(
        {
          email,
          password,
          password2
        });

      expect(isValid).toBeFalse;
      expect(errors.password).toEqual(
        expect.stringMatching('Password must be at least 6 characters')
      );
    });

    it("should add error for passwords when doesn't match", () => {
      const email = 'email@test.com';
      const password = 'securepassword';
      const password2 = 'passwordsecure';
      const { errors, isValid } = validateRegisterInput(
        {
          email,
          password,
          password2
        });

      expect(isValid).toBeFalse;
      expect(errors.password2).toEqual(
        expect.stringMatching('Passwords must match')
      );
    });

    it('should add error for password confirmation when not present', () => {
      const email = 'email@test.com';
      const password = 'securestring';
      const { errors, isValid } = validateRegisterInput(
        {
          email,
          password
        });

      expect(isValid).toBeFalse;
      expect(errors.password2).toEqual(
        expect.stringMatching('Confirm password field is required')
      );
    });

    it('should be valid when email and password are present', () => {
      const email = 'email@test.com';
      const password = 'securestring';
      const password2 = 'securestring';
      const { errors, isValid } = validateRegisterInput(
        {
          email,
          password,
          password2
        });

      expect(isValid).toBeTrue;
      expect(errors).toBeEmpty;
    });
  });
});
