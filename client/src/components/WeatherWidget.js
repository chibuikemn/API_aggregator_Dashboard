import React, { useState, useEffect } from 'react';
import { WeatherSkeleton } from './LoadingSkeleton';
import ErrorState from './ErrorState';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Dallas');

  const fetchWeather = async (cityName = city) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:5000/api/weather?city=${cityName}`);
      if (!response.ok) throw new Error('Failed to fetch weather');
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleCityChange = (e) => {
    if (e.key === 'Enter') {
      fetchWeather(e.target.value);
      setCity(e.target.value);
    }
  };

  if (loading) return <WeatherSkeleton />;
  if (error) return <ErrorState error={error} onRetry={() => fetchWeather()} title="Weather Unavailable" />;

  return (
    <div className="card">
      <div className="card-header">
        <h3>Weather</h3>
        <input
          type="text"
          placeholder="Enter city..."
          defaultValue={city}
          onKeyPress={handleCityChange}
          className="city-input"
        />
      </div>
      
      {weather && (
        <div className="weather-content">
          <div className="weather-main">
            <img 
              src={`https://openweathermap.org/img/w/${weather.icon}.png`}
              alt={weather.description}
              className="weather-icon"
            />
            <div className="weather-info">
              <div className="temperature">{Math.round(weather.temperature)}°C</div>
              <div className="location">{weather.city}, {weather.country}</div>
            </div>
          </div>
          
          <div className="weather-details">
            <div className="detail-item">
              <span>Feels like</span>
              <span>{Math.round(weather.feelsLike)}°C</span>
            </div>
            <div className="detail-item">
              <span>Humidity</span>
              <span>{weather.humidity}%</span>
            </div>
            <div className="detail-item">
              <span>Wind</span>
              <span>{weather.windSpeed} m/s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;