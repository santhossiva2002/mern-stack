const router = require('express').Router()

const feedbackController = require('../Controllers/feedbackController'); // Adjust the path accordingly
const { route } = require('./AuthRoute');
router.post('/feedback', feedbackController.createFeedback);
router.get('/getFeedback', feedbackController.getAllFeedback);
// Add this route to your server.js or routes file
router.delete('/deleteFeedback/:email', feedbackController.deleteFeedback);
router.get('/countFeedback',feedbackController.countFeedback)

module.exports = router;