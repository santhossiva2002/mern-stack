const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const aScheduleRoutes = require('./Routes/aScheduleRoute');
const axios = require('axios');
const bodyParser = require('body-parser');
const adminRoutes = require('./Routes/adminRoutes');
const { MONGO_URL, PORT } = process.env;
const userRoutes = require('./Routes/crudRoutes');
const feedback = require('./Routes/feedbackRoutes');
const airwaysModel = require('./Models/ASchedule');
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(cors({
  origin: ["https://mern-stack-client.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this line for body parsing

app.use("/", authRoute);
app.use('/api', adminRoutes);
app.use('/api',aScheduleRoutes);
app.use('/api',authRoute);
app.use('/get',authRoute);
app.use('/users', userRoutes);
app.use('/feed',feedback);
app.get('/weather/:city', async (req, res) => {
  const { city } = req.params;
  const apiKey = 'FoU+UyLeAEqemHtjEVjj8w==nyM6k1PQ9CbrxIsU';
  try{

  const response = await axios.get(`https://api.api-ninjas.com/v1/weather?city=${city}`, {
    headers: {
      'X-Api-Key': apiKey,
    }
    
  })
  res.json(response.data);
}
    catch (error) {
      console.error('Error fetching weather data:', error.message);
      res.status(500).json({ error: 'Error fetching weather data' });
    }
   
});

app.get('/api/trains/getTrain/:trainNo', async (req, res) => {
  const { trainNo } = req.params;
  try {
    const response = await axios.get(`https://indian-railway-api.cyclic.app/trains/getTrain/?trainNo=${trainNo}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching train data:', error.message);
    res.status(500).json({ error: 'Error fetching train data' });
  }
});

app.get('/api/trains-between-stations/:from/:to', async (req, res) => {
  const { from, to } = req.params;

  try {
    if (!from || !to) {
      return res.status(400).json({ error: 'Both "from" and "to" parameters are required.' });
    }

    const response = await axios.get(`https://indian-railway-api.cyclic.app/trains/betweenStations/?from=${from}&to=${to}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching train data:', error.message);
    res.status(500).json({ error: 'Error fetching train data' });
  }
});
// ... (existing code)
app.get('/api/airways/:flightNumber', async (req, res) => {
  try {
    const flightNumber = req.params.flightNumber;
    const flightData = await airwaysModel.findOne({ FlightNumber: flightNumber });

    if (!flightData) {
      return res.status(404).json({ message: 'Flight data not found for the provided FlightNumber.' });
    }

    res.json(flightData);
  } catch (error) {
    console.error('Error retrieving flight data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/api/trains/getRoute/:trainNo', async (req, res) => {
  const { trainNo } = req.params;

  try {
    if (!trainNo) {
      return res.status(400).json({ error: 'The "trainNo" parameter is required.' });
    }

    const response = await axios.get(`https://indian-railway-api.cyclic.app/trains/getRoute/?trainNo=${trainNo}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching train route data:', error.message);
    res.status(500).json({ error: 'Error fetching train route data' });
  }
});


// ... (remaining code)
