import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { cryptoService } from '../services/cryptoService';

const CryptoWidget = () => {
  const [prices, setPrices] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrices = async () => {
    try {
      console.log('Fetching prices...');
      const result = await cryptoService.getPrices();
      console.log('Prices result:', result);
      setPrices(result.data || []);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch crypto prices:', error);
      setError('Failed to load prices');
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

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchPrices(), fetchChart(selectedCoin)]);
      setLoading(false);
    };

    loadData();

    // Auto-refresh every minute
    const interval = setInterval(() => {
      fetchPrices();
      fetchChart(selectedCoin);
    }, 60000);

    return () => clearInterval(interval);
  }, [selectedCoin]);

  if (loading) return <div>Loading crypto data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>Live Crypto Prices</h3>
      
      {prices.length === 0 ? (
        <div>No price data available</div>
      ) : (
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          {prices.map(coin => (
            <div 
              key={coin.id}
              style={{ 
                padding: '10px', 
                border: selectedCoin === coin.id ? '2px solid #007bff' : '1px solid #eee',
                borderRadius: '4px',
                cursor: 'pointer',
                minWidth: '120px'
              }}
              onClick={() => setSelectedCoin(coin.id)}
            >
              <div style={{ fontWeight: 'bold' }}>{coin.name}</div>
              <div style={{ fontSize: '18px', color: '#333' }}>
                ${coin.price.toFixed(2)}
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: coin.change24h >= 0 ? 'green' : 'red' 
              }}>
                {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ height: '200px', marginTop: '20px' }}>
        <h4>{selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)} - 24h Chart</h4>
        {chartData.length === 0 ? (
          <div>No chart data available</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
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
                stroke="#007bff" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default CryptoWidget;