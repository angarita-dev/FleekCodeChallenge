const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  path: {
    type: String,
    default: '',
  },
  httpMethod: {
    type: String,
    default: '',
  },
  startTime: {
    type: String,
    default: '',
  },
  apiKey: {
    type: Schema.Types.ObjectId,
    ref: "keys"
  }
});

module.exports = Request = mongoose.model("requests", RequestSchema);
