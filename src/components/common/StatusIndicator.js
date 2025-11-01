
// ============================================
// frontend/src/components/common/StatusIndicator.jsx
// ============================================
import React from 'react';
import './StatusIndicator.css';

/**
 * Status Indicator Component
 * Shows device or entity status with color coding
 */

const StatusIndicator = ({ status = 'active', size = 'md', label = true }) => {
  const statusMap = {
    active: 'Active',
    inactive: 'Inactive',
    offline: 'Offline',
    error: 'Error',
    pending: 'Pending',
  };

  return (
    <div className={`status-indicator status-indicator--${status} status-indicator--${size}`}>
      <span className="status-indicator__dot"></span>
      {label && <span className="status-indicator__label">{statusMap[status]}</span>}
    </div>
  );
};

export default StatusIndicator;
