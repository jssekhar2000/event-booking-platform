const express = require('express');
const { register, login, createVendorProfile } = require('../controllers/auth.controller');
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/create-vendor-profile', authenticate, authorizeRoles('VENDOR'), createVendorProfile);

module.exports = router;
