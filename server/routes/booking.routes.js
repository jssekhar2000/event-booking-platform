const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');
const { bookEvent, getMyBookings } = require('../controllers/booking.controller');

router.post('/', authenticate, authorizeRoles('USER'), bookEvent);
router.get('/', authenticate, authorizeRoles('USER'), getMyBookings);

module.exports = router;
