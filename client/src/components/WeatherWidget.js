import React, { useState, useEffect } from 'react';
import { WeatherSkeleton } from './LoadingSkeleton';
import ErrorState from './ErrorState';
import StatusIndicator from './StatusIndicator';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Dallas');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [status, setStatus] = useState('loading');

  const fetchWeather = async (cityName = city) => {
    try {
      setLoading(true);
      setError(null);
      setStatus('loading');
      const response = await fetch(`http://localhost:5000/api/weather?city=${cityName}`);
      if (!response.ok) throw new Error('Failed to fetch weather');
      const data = await response.json();
      setWeather(data);
      setLastUpdated(new Date());
      setStatus('online');
    } catch (err) {
      setError(err.message);
      setStatus('offline');
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
      <div className="card-header-with-status">
        <div className="card-title-section">
          <h3>🌤️ Weather</h3>
          <StatusIndicator status={status} lastUpdated={lastUpdated} />
        </div>
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
            <div className="metric-card">
              <div className="metric-value">{Math.round(weather.feelsLike)}°</div>
              <div className="metric-label">Feels like</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{weather.humidity}%</div>
              <div className="metric-label">Humidity</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{weather.windSpeed}</div>
              <div className="metric-label">Wind (m/s)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;