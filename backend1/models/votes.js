
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  imageURL: { type: String, required: true },
  votes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Vote', voteSchema);
