const axios = require('axios');
const Weather = require('../models/weather');
require('dotenv').config();

const getWeatherByCity = async (req, res) => {
    const { city } = req.params;
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key is missing' });
    }
  
    try {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      console.log(`Requesting weather data from URL: ${url}`);
      const response = await axios.get(url);
      const weatherData = response.data;
      
      const newWeather = new Weather({ city, data: weatherData });
      await newWeather.save();
  
      res.json(weatherData);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error fetching weather data:', error.response.data);
        res.status(500).json({ error: 'Error fetching weather data', details: error.response.data });
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        res.status(500).json({ error: 'No response received from weather API' });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        res.status(500).json({ error: 'Error setting up request', message: error.message });
      }
    }
  };

const getWeatherByCoordinates = async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`);
    const weatherData = response.data;

    const newWeather = new Weather({ latitude: lat, longitude: lon, data: weatherData });
    await newWeather.save();

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
};

const get15DayForecast = async (req, res) => {
  const { city } = req.params;
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=15&appid=${process.env.WEATHER_API_KEY}`);
    const forecastData = response.data;

    const newWeather = new Weather({ city, data: forecastData });
    await newWeather.save();

    res.json(forecastData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather forecast' });
  }
};

const getTodayCurrentTemp = async (req, res) => {
  const { city } = req.params;
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`);
    const currentTemp = response.data.main.temp;

    res.json({ currentTemp });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching current temperature' });
  }
};

const getHourlyTemp = async (req, res) => {
  const { city } = req.params;
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.WEATHER_API_KEY}`);
    const hourlyData = response.data.list.map((item) => ({
      time: item.dt_txt,
      temp: item.main.temp,
    }));

    res.json(hourlyData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching hourly temperature' });
  }
};

module.exports = {
  getWeatherByCity,
  getWeatherByCoordinates,
  get15DayForecast,
  getTodayCurrentTemp,
  getHourlyTemp,
};
