const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const KeySchema = new Schema({
});

module.exports = Key = mongoose.model('keys', KeySchema);
