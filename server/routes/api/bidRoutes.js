const express = require('express');
const { authMiddleware } = require('../../utils/auth');


const { placeBid, 
    getBidsForArtwork, 
    getHighestBidForArtwork 
} = require('../../controllers/bidController');

const router = express.Router();

// Route to place a bid
router.post('/', placeBid);

// Route to get all bids for an artwork
router.get('/:artworkId', getBidsForArtwork);

// Route to get the highest bid for an artwork
router.get('/highest/:artworkId', getHighestBidForArtwork);

module.exports = router;
