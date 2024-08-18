const { Profile, Artwork, Bid } = require('../models');
const { AuthenticationError } = require('@apollo/server'); // Updated import
const { signToken } = require('../utils/auth');
const dayjs = require('dayjs');

const resolvers = {
  Query: {
    profiles: async () => Profile.find(),
    profile: async (parent, { profileId }) => Profile.findOne({ _id: profileId }),
    artworks: async () => Artwork.find().populate('bids'),
    artwork: async (parent, { artworkId }) => Artwork.findById(artworkId).populate('bids'),
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);
      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });
      if (!profile) throw new AuthenticationError('No user found with this email address');
      const correctPw = await profile.isCorrectPassword(password);
      if (!correctPw) throw new AuthenticationError('Incorrect password');
      const token = signToken(profile);
      return { token, profile };
    },
    placeBid: async (parent, { artworkId, bidAmount }, context) => {
      if (!context.user) throw new AuthenticationError('You need to be logged in!');
    
      // Fetch the artwork
      const artwork = await Artwork.findById(artworkId);
      if (!artwork) throw new Error('Artwork not found');
    
      // Ensure auction status is open and bid amount is valid
      if (dayjs().toISOString >= artwork.endTime) throw new Error('This auction is closed')
      if (bidAmount <= artwork.currentHighestBid) throw new Error('Bid must be higher than current highest bid');
    
      // Create and save the new bid
      const newBid = await Bid.create({
        profileId: context.user._id,  // Use the user's _id
        artworkId: artwork._id,       // Use the artwork's _id
        bidAmount: bidAmount,
        bidTime: new Date(),
      });
    
      // Update artwork with the new bid details
      artwork.currentHighestBid = bidAmount;
      artwork.bids.push(newBid._id);
      await artwork.save();
    
      // Update the user profile with the new bid
      await Profile.findByIdAndUpdate(context.user._id, { $push: { bids: newBid._id } });
    
      // Populate and return only the IDs
      const populatedBid = await newBid.populate('profileId artworkId', '_id');

      return {
        ...populatedBid.toObject(),
        profileId: populatedBid.profileId._id,
        artworkId: populatedBid.artworkId._id,
      };
    },
    
  },
};

module.exports = resolvers;
