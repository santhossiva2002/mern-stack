
const ASchedule = require('../Models/ASchedule');
const mongoose = require('mongoose');
// Define a function to fetch data
async function getAllAScheduleData(req, res) {
  try {
    const data = await ASchedule.find(); // Fetch all documents in the collection
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Create a new ASchedule
const createASchedule = async (req, res) => {
  try {
    const { _id, Departure, Arrival, Stop, FlightNumber } = req.body; // Replace with your actual field names
    const newASchedule = new ASchedule({ _id, Departure, Arrival, Stop, FlightNumber }); // Replace with your actual field names
    const savedASchedule = await newASchedule.save();
    res.json(savedASchedule);
  } catch (error) {
    console.error('Error creating ASchedule:', error);
    res.status(500).json({ error: 'Error creating ASchedule' });
  }
}

// Define a function to count documents
const getCount = async (req, res) => {
  try {
    const count = await ASchedule.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error counting documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get all ASchedules
const getAllASchedules = async (req, res) => {
  try {
    const allASchedules = await ASchedule.find();
    res.json(allASchedules);
  } catch (error) {
    console.error('Error fetching ASchedules:', error);
    res.status(500).json({ error: 'Error fetching ASchedules' });
  }
}

// Get ASchedule by ID
const getAScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const aschedule = await ASchedule.findById(id);
    if (!aschedule) {
      return res.status(404).json({ error: 'ASchedule not found' });
    }
    res.json(aschedule);
  } catch (error) {
    console.error('Error fetching ASchedule:', error);
    res.status(500).json({ error: 'Error fetching ASchedule' });
  }
}

// Update ASchedule by ID
const updateAScheduleById = async (req, res) => {
  try {
      const { id } = req.params;
      const { FlightName, Departure, Arrival, Stop, FlightNumber } = req.body;

   
      const updatedASchedule = await ASchedule.findByIdAndUpdate(
         new mongoose.Types.ObjectId(id),
          { FlightName, Departure, Arrival, Stop, FlightNumber },
          { new: true }
      );

      if (!updatedASchedule) {
          console.log('ASchedule not found for update.');
          return res.status(404).json({ error: 'ASchedule not found' });
      }

      
      res.json(updatedASchedule);
  } catch (error) {
      console.error('Error updating ASchedule:', error);
      res.status(500).json({ error: 'Error updating ASchedule' });
  }
};


// Delete ASchedule by ID
const deleteAScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedASchedule = await ASchedule.findByIdAndDelete(id);
    if (!deletedASchedule) {
      return res.status(404).json({ error: 'ASchedule not found' });
    }
    res.json({ message: 'ASchedule deleted successfully' });
  } catch (error) {
    console.error('Error deleting ASchedule:', error);
    res.status(500).json({ error: 'Error deleting ASchedule' });
  }
}

module.exports = {
  getAllAScheduleData,
  createASchedule,
  getCount,
  getAllASchedules,
  getAScheduleById,
  updateAScheduleById,
  deleteAScheduleById,
};

