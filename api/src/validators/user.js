const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = {
  validateLoginInput: (data) => {
    let errors = {};

    // Setting empty fields into empty string
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Validate email
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  },

  validateRegisterInput: (data) => {
    let errors = {};

    // Setting empty fields into empty string
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Validate email
    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    } else if (Validator.isEmpty(data.password2)) {
      errors.password2 = "Confirm password field is required";
    } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password must be at least 6 characters";
    } else if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = "Passwords must match";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
};
