import React from 'react';

const LoadingSkeleton = ({ width = '100%', height = '20px', className = '' }) => (
  <div 
    className={`skeleton ${className}`}
    style={{ 
      width, 
      height, 
      backgroundColor: 'var(--skeleton-bg)',
      borderRadius: '4px',
      animation: 'pulse 1.5s ease-in-out infinite'
    }}
  />
);

export const CardSkeleton = () => (
  <div className="card">
    <LoadingSkeleton height="24px" width="60%" className="mb-3" />
    <LoadingSkeleton height="16px" width="100%" className="mb-2" />
    <LoadingSkeleton height="16px" width="80%" className="mb-2" />
    <LoadingSkeleton height="100px" width="100%" />
  </div>
);

export const WeatherSkeleton = () => (
  <div className="card">
    <LoadingSkeleton height="24px" width="40%" className="mb-3" />
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
      <LoadingSkeleton height="60px" width="60px" />
      <div style={{ flex: 1 }}>
        <LoadingSkeleton height="32px" width="80px" className="mb-2" />
        <LoadingSkeleton height="16px" width="120px" />
      </div>
    </div>
    <LoadingSkeleton height="16px" width="100%" className="mb-2" />
    <LoadingSkeleton height="16px" width="90%" />
  </div>
);

export const NewsSkeleton = () => (
  <div className="card">
    <LoadingSkeleton height="24px" width="30%" className="mb-3" />
    {[...Array(3)].map((_, i) => (
      <div key={i} className="news-item" style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid var(--border-color)' }}>
        <LoadingSkeleton height="18px" width="100%" className="mb-2" />
        <LoadingSkeleton height="14px" width="100%" className="mb-1" />
        <LoadingSkeleton height="14px" width="70%" />
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;