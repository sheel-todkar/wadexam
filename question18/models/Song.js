const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  Songname: String,
  Film: String,
  Music_director: String,
  singer: String,
  actor: String,
  actress: String
});

module.exports = mongoose.model('Song', songSchema);
