const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');
const { getAllEventsAdmin, updateEventStatus, getAllUsers } = require('../controllers/admin.controller');

router.get('/events', authenticate, authorizeRoles('ADMIN'), getAllEventsAdmin);
router.put('/events/:id/approve', authenticate, authorizeRoles('ADMIN'), updateEventStatus);
router.get('/users', authenticate, authorizeRoles('ADMIN'), getAllUsers);

module.exports = router;
