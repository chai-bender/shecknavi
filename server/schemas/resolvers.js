const { Profile, Artwork, Bid } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    artworks: async () => {
      return Artwork.find().populate('bids');
    },
    artwork: async (parent, { artworkId }) => {
      return Artwork.findById(artworkId).populate('bids');
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError
      }

      const token = signToken(profile);
      return { token, profile };
    },

  
    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId });
    },
    placeBid: async (parent, { artworkId, bidAmount }, context) => {
      if (!context.user) throw new AuthenticationError('You need to be logged in!');

      // Fetch the artwork
      const artwork = await Artwork.findById(artworkId).populate('bids');
      if (!artwork) throw new Error('Artwork not found');

      // Ensure auction status is open and bid amount is valid
      if (artwork.isAuctionClosed) throw new Error('Auction is closed');
      if (bidAmount <= artwork.currentHighestBid) throw new Error('Bid must be higher than current highest bid');

      // Create and save the new bid
      const newBid = await Bid.create({
        userId: context.user._id,
        artworkId: artworkId,
        bidAmount: bidAmount,
        bidTime: new Date(),
      });

      // Update artwork with the new bid details
      artwork.currentHighestBid = bidAmount;
      artwork.bids.push(newBid._id);
      await artwork.save();

      // Update the user profile with the new bid
      await Profile.findByIdAndUpdate(context.user._id, { $push: { bids: newBid._id } });

      // Return the new bid with populated references
      return newBid.populate('bidder artwork');
    },
  
  },
};

module.exports = resolvers;
