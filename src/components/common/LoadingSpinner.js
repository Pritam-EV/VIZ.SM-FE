
// ============================================
// frontend/src/components/common/LoadingSpinner.jsx
// ============================================

import './LoadingSpinner.css';

/**
 * Loading Spinner Component
 * Shows loading state with animation
 */

const LoadingSpinner = ({ size = 'md', variant = 'primary', text = null }) => {
  return (
    <div className={`spinner spinner--${size} spinner--${variant}`}>
      <div className="spinner__container">
        <div className="spinner__dot"></div>
      </div>
      {text && <p className="spinner__text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
