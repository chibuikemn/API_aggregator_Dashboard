import express from 'express';
import { getWeather } from '../services/weather.service.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const weather = await getWeather(city);
    res.json(weather);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: error.response?.data?.message || error.message 
    });
  }
});

export default router;
