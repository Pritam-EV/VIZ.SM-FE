
// ============================================
// frontend/src/components/common/SerialDisplay.jsx
// ============================================

import './SerialDisplay.css';

/**
 * Serial Display Component
 * Shows device serial number with spaced letters
 */

const SerialDisplay = ({ serial, label = 'SERIAL NUMBER' }) => {
  const spacedSerial = serial
    .toUpperCase()
    .split('')
    .join(' ');

  return (
    <div className="serial-display">
      {label && <p className="serial-display__label">{label}</p>}
      <p className="serial-display__serial">{spacedSerial}</p>
    </div>
  );
};

export default SerialDisplay;

