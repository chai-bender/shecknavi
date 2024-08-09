const router = require('express').Router();
const userRoutes = require('./user-routes');
const bidRoutes = require('./bidRoutes')

router.use('/users', userRoutes);
router.use('/bids', bidRoutes);


module.exports = router;
