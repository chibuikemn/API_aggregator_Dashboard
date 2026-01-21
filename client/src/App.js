import React from 'react';
import CryptoWidget from './components/CryptoWidget';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>API Aggregator Dashboard</h1>
      <CryptoWidget />
    </div>
  );
}

export default App;