import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import WeatherWidget from './components/WeatherWidget';
import NewsWidget from './components/NewsWidget';
import CryptoWidget from './components/CryptoWidget';
import './styles/Dashboard.css';

const Dashboard = () => {
  const { isDark, toggleTheme } = useTheme();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">API Aggregator Dashboard</h1>
        <div className="dashboard-controls">
          <button className="btn refresh-btn" onClick={handleRefresh}>
            🔄 Refresh
          </button>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
      
      <div className="dashboard-grid" key={refreshKey}>
        <WeatherWidget />
        <NewsWidget />
        <CryptoWidget />
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;