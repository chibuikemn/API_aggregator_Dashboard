import React from 'react';

const StatusIndicator = ({ status = 'online', lastUpdated, className = '' }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'online': return '#10b981';
      case 'offline': return '#ef4444';
      case 'loading': return '#f59e0b';
      default: return '#64748b';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'online': return 'Live';
      case 'offline': return 'Offline';
      case 'loading': return 'Updating';
      default: return 'Unknown';
    }
  };

  return (
    <div className={`status-indicator ${className}`}>
      <div 
        className="status-dot"
        style={{ 
          backgroundColor: getStatusColor(),
          animation: status === 'loading' ? 'pulse 2s infinite' : 'none'
        }}
      />
      <span className="status-text">{getStatusText()}</span>
      {lastUpdated && (
        <span className="last-updated">
          Updated {new Date(lastUpdated).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;