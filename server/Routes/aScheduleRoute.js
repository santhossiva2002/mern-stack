// routes/aScheduleRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllAScheduleData,
 
  createASchedule,
  getCount,
  getAllASchedules,
  getAScheduleById,
  updateAScheduleById,
  deleteAScheduleById,
} = require('../Controllers/aScheduleController');

// Fetch all schedules
router.get('/getAll', getAllASchedules);
router.get('/getCount', getCount);
// Fetch schedule by ID
router.get('/:id', getAScheduleById);

// Update schedule by ID
router.put('/update/:id', updateAScheduleById);

// Delete schedule by ID
router.delete('/delete/:id', deleteAScheduleById);

// Create a new schedule
router.post('/create', createASchedule);

// Fetch all schedule data
router.get('/getAllData', getAllAScheduleData);

// Get count of documents


module.exports = router;
