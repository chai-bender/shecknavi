const router = require('express').Router();
const userRoutes = require('./user-routes');
const bidRoutes = require('./bidRoutes');
const artworkRoutes = require('./artwork-routes');

router.use('/users', userRoutes);
router.use('/bids', bidRoutes);
router.use('/artwork', artworkRoutes);


module.exports = router;
