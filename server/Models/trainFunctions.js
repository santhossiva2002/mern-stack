const rp = require("request-promise");

// Function to get train information by train number
const getTrainInformation = (trainNo, callback) => {
  rp(
    `https://indian-railway-api.cyclic.app/trains/getTrain/?trainNo=${trainNo}`
  )
    .then((resp) => {
      callback(resp);
    })
    .catch((err) => {
      callback(err);
    });
};

// Function to get trains between two stations
const getTrainBtwStation = (from, to, callback) => {
  rp(
    `https://indian-railway-api.cyclic.app/trains/betweenStations/?from=${from}&to=${to}`
  )
    .then((resp) => {
      callback(resp);
    })
    .catch((err) => {
      callback(err);
    });
};

// Add more functions for other train-related API endpoints as needed

module.exports = {
    getTrainInformation,
    getTrainBtwStation,
    // Add other functions here
  };