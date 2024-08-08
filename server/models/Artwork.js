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
  currentBid: {
    type: Number,
    default: 0,
  },
  isAuctionClosed: {
    type: Boolean,
    default: false,
  },
  bids: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      bidAmount: {
        type: Number,
        required: true,
      },
      bidTime: {
        type: Date,
        required: true,
      },
    },
  ],
});
 
const Artwork = mongoose.model('Artwork', artworkSchema);
 
module.exports = Artwork;