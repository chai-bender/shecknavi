const mongoose = require('mongoose');
 
const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startingBid: {
    type: Number,
    required: true,
  },
  currentHighestBid: {
    type: Number,
    default: 0,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  bids: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bid'
    }
],
});
 
const Artwork = mongoose.model('Artwork', artworkSchema);
 
module.exports = Artwork;