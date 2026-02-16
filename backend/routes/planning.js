const express = require('express');
const router = express.Router();
const controller = require('../controllers/planningController');

router.post('/plannings', controller.createPlanning);
router.get('/plannings', controller.getUserPlannings);
router.put('/plannings/:id', controller.updatePlanning);
router.delete('/plannings/:id', controller.deletePlanning);

module.exports = router;