// import user model
const { Artwork } = require('../models');


module.exports = {
    // create artwork
    postArtwork(req, res) {
        Artwork.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    //delete artwork
    deleteArtwork(req, res) {
        Artwork.findOneAndDelete({ _id: req.params.artworkId })
            .then(() => res.json({ message: "Artwork deleted" }))
            .catch((err) => res.status(500).json(err));
    },
  };
  