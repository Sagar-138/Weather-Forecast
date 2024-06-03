const axios=require('axios');

const fetchWeatherData=async(location,apiKey)=>{
const url=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`

try {
    const response= await axios.get(url);
    return response.data;
} catch (error) {
    console.error("Error fetching weather data: ", error.message);
    throw new Error('failed to fetch data ');

}

};

module.exports = {fetchWeatherData};