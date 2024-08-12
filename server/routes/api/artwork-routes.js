const express = require('express');
const { authMiddleware } = require('../../utils/auth');


const { postArtwork, 
    deleteArtwork
} = require('../../controllers/artwork-controller');

const router = express.Router();

// Route to post an artwork
router.route('/').post(postArtwork);

// Route to delete an artwork
router.route('/:artworkId').delete(deleteArtwork);

module.exports = router;
