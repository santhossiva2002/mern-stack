const Feedback = require('../Models/feedbackModel'); // Adjust the path accordingly

// Controller function to handle POST request for feedback creation
const createFeedback = async (req, res) => {
  try {
    // Extract data from the request body
    const { name, email, feedback } = req.body;

    // Create a new feedback instance
    const newFeedback = new Feedback({
      name,
      email,
      feedback,
    });

    // Save the feedback to the database
    const savedFeedback = await newFeedback.save();

    // Respond with the saved feedback
    res.status(201).json(savedFeedback);
  } catch (error) {
    // Handle errors and respond with an error message
    console.error('Error creating feedback:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to handle GET request for fetching all feedback entries
const getAllFeedback = async (req, res) => {
  try {
    // Fetch all feedback entries from the database
    const allFeedback = await Feedback.find();

    // Respond with the fetched feedback entries
    res.status(200).json(allFeedback);
  } catch (error) {
    // Handle errors and respond with an error message
    console.error('Error fetching feedback:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteFeedback = async (req, res) => {
    try {
      const email = req.params.email;
      // Implement logic to delete feedback by email
      await Feedback.deleteOne({ email });
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting feedback:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
 // Controller function to handle GET request for counting all feedback entries
const countFeedback = async (req, res) => {
    try {
      // Count all feedback entries in the database
      const feedbackCount = await Feedback.countDocuments();
  
      // Respond with the count of feedback entries
      res.status(200).json({ count: feedbackCount });
    } catch (error) {
      // Handle errors and respond with an error message
      console.error('Error counting feedback:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    createFeedback,
    getAllFeedback,
    deleteFeedback,
    countFeedback, // Add the new function to the module exports
  };
  
  