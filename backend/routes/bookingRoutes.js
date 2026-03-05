const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', protect, createBooking);
router.get('/', protect, adminOnly, getAllBookings);
router.get('/:userId', protect, getUserBookings);
router.put('/:id/status', protect, adminOnly, updateBookingStatus);

module.exports = router;
