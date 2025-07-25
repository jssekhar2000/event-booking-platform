const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');
const { getPendingEventsAdmin, updateEventStatus, getAllUsersAdmin } = require('../controllers/admin.controller');

router.get('/events', authenticate, authorizeRoles('ADMIN'), getPendingEventsAdmin);
router.put('/events/:id/approve', authenticate, authorizeRoles('ADMIN'), updateEventStatus);
router.get('/users', authenticate, authorizeRoles('ADMIN'), getAllUsersAdmin);

module.exports = router;
