const express = require('express');
const router = express.Router();
const rScheduleController = require('../Controllers/rScheduleController');

// Define a route to get all RSchedule data
router.get('/getRScheduleData', rScheduleController.getAllRScheduleData);

module.exports = router;
