const express = require('express');
const router = express.Router();
const weatherController = require('../controller/weatherForecast');

router.get('/:location', weatherController.getWeatherForecast);
module.exports = router;