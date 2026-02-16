const express = require('express');
const router = express.Router();
const {
  createEvent,
  getPlanningEvents,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

router.post('/events', createEvent);
router.get('/plannings/:planningId/events', getPlanningEvents);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

module.exports = router;