const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  keys: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'keys'
    }
  ]
});

module.exports = User = mongoose.model("users", UserSchema);
