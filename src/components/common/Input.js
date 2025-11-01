// frontend/src/components/common/Input.jsx

import React from 'react';
import './Input.css';

/**
 * Input Component
 * Reusable text input with error, success, and helper text support
 */

const Input = React.forwardRef(
  (
    {
      label,
      type = 'text',
      placeholder,
      error,
      success,
      helper,
      icon,
      iconRight,
      disabled = false,
      required = false,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`input-wrapper ${className}`}>
        {label && (
          <label className="input-label">
            {label}
            {required && <span className="input-label-required">*</span>}
          </label>
        )}

        <div className={`input-field ${error ? 'input-field--error' : ''} ${success ? 'input-field--success' : ''} ${disabled ? 'input-field--disabled' : ''}`}>
          {icon && <span className="input-icon">{icon}</span>}

          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            {...props}
          />

          {iconRight && <span className="input-icon">{iconRight}</span>}
        </div>

        {(error || helper) && (
          <span
            className={`input-helper ${
              error ? 'input-helper--error' : 'input-helper--success'
            }`}
          >
            {error || helper}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

