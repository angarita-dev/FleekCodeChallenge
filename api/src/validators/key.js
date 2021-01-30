const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = {
  validateRemoveInput: (data) => {
    let errors = {};

    // Setting empty fields into empty string
    data.key = !isEmpty(data.key) ? data.key : "";

    // Validate key presence
    if (Validator.isEmpty(data.key)) {
      errors.key = "Key field is required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
};
