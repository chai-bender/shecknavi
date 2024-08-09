const { Bid, Artwork } = require('../models');
const { getGlobalEndTime } = require('../utils/globalTime'); 

module.exports = {
  // Place a bid for a specific artwork
  async placeBid(req, res) {
    const { artworkId, amount } = req.body;
    const { _id: userId } = req.user; 

    // Check if the global auction end time has passed
    if (Date.now() > getGlobalEndTime()) {
      return res.status(400).json({ message: 'Auction has ended!' });
    }

    // Validate bid details
    if (!artworkId || !amount) {
      return res.status(400).json({ message: 'Please provide artwork ID and bid amount!' });
    }

    try {
      // Find the artwork to check current bid
      const artwork = await Artwork.findById(artworkId);

      if (!artwork) {
        return res.status(404).json({ message: 'Artwork not found!' });
      }

      // Check if the bid amount is higher than the current bid
      if (amount <= artwork.currentBid) {
        return res.status(400).json({ message: 'Bid amount must be higher than the current bid!' });
      }

      // Create a new bid
      const newBid = await Bid.create({
        artworkId,
        amount,
        userId,
      });

      // Update the artwork with the new highest bid
      await Artwork.findByIdAndUpdate(artworkId, {
        $push: { bids: newBid._id },
        currentBid: amount
      });

      // Respond with the newly created bid
      res.json(newBid);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while placing the bid!' });
    }
  },

  // Get all bids for a specific artwork
  async getBidsForArtwork(req, res) {
    const { artworkId } = req.params;

    try {
      // Find bids for the specified artwork
      const bids = await Bid.find({ artworkId }).sort({ amount: -1 }); // Sort bids by amount in descending order

      // Respond with the list of bids
      res.json(bids);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while retrieving bids!' });
    }
  },

  // Get the highest bid for a specific artwork
  async getHighestBidForArtwork(req, res) {
    const { artworkId } = req.params;

    try {
      // Find the highest bid for the specified artwork
      const highestBid = await Bid.findOne({ artworkId }).sort({ amount: -1 }).limit(1);

      // Respond with the highest bid
      if (highestBid) {
        res.json(highestBid);
      } else {
        res.status(404).json({ message: 'No bids found for this artwork!' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while retrieving the highest bid!' });
    }
  },
};
