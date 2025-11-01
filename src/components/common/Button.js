// frontend/src/components/common/Button.jsx

import React from 'react';
import './Button.css';

/**
 * Button Component
 * Versatile button with multiple variants, sizes, and states
 *
 * @component
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 */

const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled = false,
      loading = false,
      icon = null,
      iconPosition = 'left',
      type = 'button',
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    const buttonClasses = [
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      fullWidth && 'btn--full',
      disabled && 'btn--disabled',
      loading && 'btn--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const renderContent = () => {
      if (loading) {
        return (
          <>
            <span className="btn__spinner"></span>
            <span className="btn__text">{children}</span>
          </>
        );
      }

      if (icon) {
        return iconPosition === 'left' ? (
          <>
            <span className="btn__icon btn__icon--left">{icon}</span>
            <span className="btn__text">{children}</span>
          </>
        ) : (
          <>
            <span className="btn__text">{children}</span>
            <span className="btn__icon btn__icon--right">{icon}</span>
          </>
        );
      }

      return <span className="btn__text">{children}</span>;
    };

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={onClick}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
