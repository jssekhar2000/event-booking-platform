const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');
const { createEvent, getVendorEvents, updateEvent, deleteEvent } = require('../controllers/vendor.controller');

router.post(
  '/events',
  authenticate,
  authorizeRoles('VENDOR'),
  createEvent
);

router.get(
  '/events',
  authenticate,
  authorizeRoles('VENDOR'),
  getVendorEvents
);

router.put(
  '/events/:id',
  authenticate,
  authorizeRoles('VENDOR'),
  updateEvent
);

router.delete(
  '/events/:id',
  authenticate,
  authorizeRoles('VENDOR'),
  deleteEvent
);

module.exports = router;
