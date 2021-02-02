const mongoose = require('mongoose');
const generateSafeId = require('generate-safe-id');
// Validators
const { validateRemoveInput } = require("../validators/key");

// Models
const Key = require('../models/key');
const User = require('../models/user');
const Request = require('../models/request');

// Exports controller methods
module.exports = {
  // Creates new key
  keyCreate: (req, res) => {
    // Generates secure key
    const newAPIKEY = generateSafeId();

    // Creates & saves new key
    const newKey = new Key({
      key: newAPIKEY,
      owner: req.user.id
    })
      .save()
      .then(key => {
        return User.findOneAndUpdate(
          { _id: req.user.id },
          { $push: { keys: key._id } }
        )
          .then(newUser => {
            res.status(201).json(key)
          })
          .catch(err => console.log(err));
      });
  },

  // Deletes key
  keyDelete: (req, res) => {
    const { errors, isValid } = validateRemoveInput(req.body);

    // Validations
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Finds key to get key id
    Key.findOne({ key: req.body.key })
      .then(key => {
        // Return 400 if key doesn't exists
        if (!key) {
          return res.status(400).json({
            key: "Key doesn't exists"
          })
        }

        // Finds User using the _id and key
        const filter = {
          _id: req.user.id,
          keys: mongoose.Types.ObjectId(key._id)
        }

        // Removes key from keys array
        const update = {
          $pull: { keys: key._id }
        }

        // Find User with listed key
        return User.findOneAndUpdate(filter, update)
          .then(user => {
            // Return 400 if key doesn't belong to User
            if (!user) {
              return res.status(400).json({
                key: "Key doesn't belong to current user"
              })
            }
          })
          .then(user => Key.findOneAndDelete({ key: req.body.key }))
      })
    // Returns deleted key
      .then(key => res.status(200).json({ deletedKey: key.key }))
      .catch(err => console.log(err));
  }
};
