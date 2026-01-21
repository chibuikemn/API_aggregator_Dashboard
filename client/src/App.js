import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import WeatherWidget from './components/WeatherWidget';
import NewsWidget from './components/NewsWidget';
import CryptoWidget from './components/CryptoWidget';
import './styles/Dashboard.css';

const Dashboard = () => {
  const { isDark, toggleTheme } = useTheme();
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshKey(prev => prev + 1);
    // Simulate refresh delay for better UX
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">API Aggregator Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0 0', fontSize: '16px' }}>
            Real-time data from multiple APIs
          </p>
        </div>
        <div className="dashboard-controls">
          <button 
            className={`btn refresh-btn ${isRefreshing ? 'refreshing' : ''}`} 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            🔄 {isRefreshing ? 'Refreshing...' : 'Refresh All'}
          </button>
          <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
      
      <div className="dashboard-grid" key={refreshKey}>
        <WeatherWidget />
        <NewsWidget />
        <CryptoWidget />
      </div>
      
      {/* Floating Action Button */}
      <button 
        className="fab" 
        onClick={handleRefresh}
        title="Refresh all data"
        disabled={isRefreshing}
      >
        {isRefreshing ? '⏳' : '🔄'}
      </button>
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