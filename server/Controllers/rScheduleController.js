// controllers/rScheduleController.js
const RSchedule = require('../Models/RSchedule');

// Define a function to fetch data
async function getAllRScheduleData(req, res) {
  try {
    const data = await RSchedule.find(); // Fetch all documents in the collection
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getAllRScheduleData };
