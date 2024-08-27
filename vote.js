const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  voterId: { type: String, required: true },
  votes: {
    President: { type: String, required: true },
    'Vice President': { type: String, required: true },
    Secretary: { type: String, required: true },
    'Joint Secretary': { type: String, required: true }
  }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
