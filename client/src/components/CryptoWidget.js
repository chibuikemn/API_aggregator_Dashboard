import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { cryptoService } from '../services/cryptoService';
import { CardSkeleton } from './LoadingSkeleton';
import ErrorState from './ErrorState';
import StatusIndicator from './StatusIndicator';

const CryptoWidget = () => {
  const [prices, setPrices] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [status, setStatus] = useState('loading');

  const fetchPrices = async () => {
    try {
      setStatus('loading');
      console.log('Fetching prices...');
      const result = await cryptoService.getPrices();
      console.log('Prices result:', result);
      setPrices(result.data || []);
      setError(null);
      setLastUpdated(new Date());
      setStatus('online');
    } catch (error) {
      console.error('Failed to fetch crypto prices:', error);
      setError('Failed to load prices');
      setStatus('offline');
    }
  };

  const fetchChart = async (coinId) => {
    try {
      console.log('Fetching chart for:', coinId);
      const result = await cryptoService.getChart(coinId, 1);
      console.log('Chart result:', result);
      setChartData(result.data || []);
    } catch (error) {
      console.error('Failed to fetch chart data:', error);
    }
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchPrices(), fetchChart(selectedCoin)]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();

    // Auto-refresh every minute
    const interval = setInterval(() => {
      fetchPrices();
      fetchChart(selectedCoin);
    }, 60000);

    return () => clearInterval(interval);
  }, [selectedCoin]);

  if (loading) return <CardSkeleton />;
  if (error) return <ErrorState error={error} onRetry={loadData} title="Crypto Data Unavailable" />;

  return (
    <div className="card">
      <div className="card-header-with-status">
        <div className="card-title-section">
          <h3>💰 Live Crypto Prices</h3>
          <StatusIndicator status={status} lastUpdated={lastUpdated} />
        </div>
      </div>
      
      {prices.length === 0 ? (
        <div>No price data available</div>
      ) : (
        <div className="crypto-prices">
          {prices.map(coin => (
            <div 
              key={coin.id}
              className={`crypto-card ${selectedCoin === coin.id ? 'selected' : ''}`}
              onClick={() => setSelectedCoin(coin.id)}
            >
              <div className="crypto-name">{coin.name}</div>
              <div className="crypto-price">
                ${coin.price.toFixed(2)}
              </div>
              <div className={`crypto-change ${coin.change24h >= 0 ? 'positive' : 'negative'}`}>
                {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="chart-container">
        <h4>📈 {selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)} - 24h Chart</h4>
        {chartData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            No chart data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                hide
              />
              <YAxis hide />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="var(--primary)" 
                strokeWidth={3}
                dot={false}
                strokeLinecap="round"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default CryptoWidget;