// controllers/weatherMapController.js
const axios = require('axios');
const { OPENWEATHERMAP_API_KEY } = process.env;

const getWeatherMap = async (req, res) => {
  const { city } = req.query;
  const url = `http://maps.openweathermap.org/maps/2.0/weather/TA2/10/10/10?appid=${OPENWEATHERMAP_API_KEY}&q=${city}`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching weather map' });
  }
};

module.exports = { getWeatherMap };