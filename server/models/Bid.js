const mongoose = require('mongoose');
 
const bidSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  artworkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artwork',
    required: true,
  },
  bidAmount: {
    type: Number,
    required: true,
  },
  bidTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
 
const Bid = mongoose.model('Bid', bidSchema);
 
module.exports = Bid;
 