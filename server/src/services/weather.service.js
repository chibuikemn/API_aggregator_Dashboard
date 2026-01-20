import axios from 'axios';
import cache from '../cache/cacheManager.js';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeather = async (city) => {
  const cacheKey = `weather_${city.toLowerCase()}`;
  const cached = cache.get(cacheKey);
  
  if (cached) {
    return { ...cached, cached: true };
  }

  const { data } = await axios.get(BASE_URL, {
    params: { q: city, appid: API_KEY, units: 'metric' }
  });

  const normalized = {
    city: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    windSpeed: data.wind.speed
  };

  cache.set(cacheKey, normalized);
  return { ...normalized, cached: false };
};
