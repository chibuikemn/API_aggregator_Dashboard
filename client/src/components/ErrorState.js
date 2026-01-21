import React from 'react';

const ErrorState = ({ error, onRetry, title = 'Something went wrong' }) => (
  <div className="error-state">
    <div className="error-icon">⚠️</div>
    <h3>{title}</h3>
    <p>{error || 'An unexpected error occurred'}</p>
    {onRetry && (
      <button className="btn btn-primary" onClick={onRetry}>
        Try Again
      </button>
    )}
  </div>
);

export default ErrorState;