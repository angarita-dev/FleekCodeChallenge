const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const KeySchema = new Schema({
  key: {
    type: String,
    required: true
  },
  requestCount: {
    type: Number,
    default: 0
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'requests'
    }
  ]
});

module.exports = Key = mongoose.model('keys', KeySchema);
