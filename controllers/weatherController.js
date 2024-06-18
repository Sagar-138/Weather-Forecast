//controller
const axios = require('axios');
const Weather = require('../models/weather');
require('dotenv').config();

const API_BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

const getWeatherByCity = async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing' });
  }

  try {
    const url = `${API_BASE_URL}/${city}?key=${apiKey}`;
    console.log(`Requesting weather data from URL: ${url}`);
    const response = await axios.get(url);
    const weatherData = response.data;

    const newWeather = new Weather({ city, data: weatherData });
    await newWeather.save();

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Error fetching weather data', details: error.message });
  }
};

const getWeatherByCoordinates = async (req, res) => {
  const { lat, lon } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing' });
  }

  try {
    const url = `${API_BASE_URL}/${lat},${lon}?key=${apiKey}`;
    console.log(`Requesting weather data from URL: ${url}`);
    const response = await axios.get(url);
    const weatherData = response.data;

    const newWeather = new Weather({ latitude: lat, longitude: lon, data: weatherData });
    await newWeather.save();

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Error fetching weather data', details: error.message });
  }
};

const get15DayForecast = async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing' });
  }

  try {
    const url = `${API_BASE_URL}/${city}/today?&key=${apiKey}&include=days`;
    console.log(`Requesting 15-day forecast from URL: ${url}`);
    const response = await axios.get(url);
    const forecastData = response.data;

    const newWeather = new Weather({ city, data: forecastData });
    await newWeather.save();

    res.json(forecastData);
  } catch (error) {
    console.error('Error fetching weather forecast:', error.message);
    res.status(500).json({ error: 'Error fetching weather forecast', details: error.message });
  }
};

const getTodayCurrentTemp = async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing' });
  }

  try {
    const url = `${API_BASE_URL}/${city}/today?&key=${apiKey}&include=current`;
    console.log(`Requesting current temperature from URL: ${url}`);
    const response = await axios.get(url);
    const currentTemp = response.data.currentConditions?.temp;

    res.json({ currentTemp });
  } catch (error) {
    console.error('Error fetching current temperature:', error.message);
    res.status(500).json({ error: 'Error fetching current temperature', details: error.message });
  }
};

const getHourlyTemp = async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing' });
  }

  try {
    const url = `${API_BASE_URL}/${city}/today?&key=${apiKey}&include=hours`;
    console.log(`Requesting hourly temperature from URL: ${url}`);
    const response = await axios.get(url);
    const hourlyData = response.data?.hours || [];

    res.json(hourlyData);
  } catch (error) {
    console.error('Error fetching hourly temperature:', error.message);
    res.status(500).json({ error: 'Error fetching hourly temperature', details: error.message });
  }
};

module.exports = {
  getWeatherByCity,
  getWeatherByCoordinates,
  get15DayForecast,
  getTodayCurrentTemp,
  getHourlyTemp,
};
