const express = require('express');
const router = express.Router();
const {
  getWeatherByCity,
  getWeatherByCoordinates,
  get15DayForecast,
  getTodayCurrentTemp,
  getHourlyTemp,
} = require('../controllers/weatherController');

router.get('/weather/city/:city', getWeatherByCity);
router.get('/weather/coordinates', getWeatherByCoordinates);
router.get('/forecast/15days/:city', get15DayForecast);
router.get('/temperature/today/:city', getTodayCurrentTemp);
router.get('/temperature/hourly/:city', getHourlyTemp);

module.exports = router;
