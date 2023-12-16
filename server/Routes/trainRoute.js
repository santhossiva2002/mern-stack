const express = require('express');
const router = express.Router();
const trainFunctions = require('../Models/trainFunctions');

// Define a route to get train information by train number
router.get('/train-info/:trainNo', (req, res) => {
  const trainNo = req.params.trainNo;
  trainFunctions.getTrainInformation(trainNo, (data) => {
    res.json(data);
  });
});

router.get('/trains-between/:from/:to', (req, res) => {
  const { from, to } = req.params;
  trainFunctions.getTrainBtwStation(from, to, (data) => {
    res.json(data);
  });
});

// Define other train-related routes as needed

module.exports = router;
