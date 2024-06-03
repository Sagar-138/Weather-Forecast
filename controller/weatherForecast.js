const WeatherModel=require('../models/weatherModel');

const getWeatherForecast= async(req,res)=>{
    const location=req.params.location;
    const apiKey=process.env.WEATHER_API_KEY;

    try {
        const weatherData=await WeatherModel.fetchWeatherData(location,apiKey);
        const impData = weatherData.days.map(day=>({
            date: day.datetime,
            tempMax: day.tempmax,
            tempMin: day.tempmin,
            temp: day.temp,
            feelsLikeMax: day.feelslikemax,
            feelsLikeMin: day.feelslikemin,
            feelsLike: day.feelslike,
            humidity: day.humidity,
            precip: day.precip,
            windSpeed: day.windspeed,
            conditions: day.conditions,
            icon: day.icon   
        }));
        const response ={
            queryCost:weatherData.queryCost,
            latitude: weatherData.latitude,
            longitude: weatherData.longitude,
            resolvedAddress: weatherData.resolvedAddress,
            address: weatherData.address,
            timezone: weatherData.timezone,
            tzoffset: weatherData.tzoffset,
            description: weatherData.description,
            days: impData
        }
        res.status(200).json(response);
    } catch ( error) {
        console.error("Error fetching weather data: ", error.message);
        res.status(500).json({error:'failed to fetch weather data'});
    }
};
module.exports={getWeatherForecast};
