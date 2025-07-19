const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');
const { createEvent } = require('../controllers/vendor.controller');

router.post(
  '/events',
  authenticate,
  authorizeRoles('VENDOR'),
  createEvent
);

module.exports = router;
