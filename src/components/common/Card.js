// ============================================
// frontend/src/components/common/Card.jsx
// ============================================

/**
 * Card Component
 * Container component with shadow and spacing
 */
import React from 'react';

const Card = React.forwardRef(
  (
    {
      children,
      variant = 'default',
      size = 'lg',
      header,
      footer,
      className = '',
      ...props
    },
    ref
  ) => {
    const cardClasses = [
      'card',
      `card--${variant}`,
      `card--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={cardClasses} {...props}>
        {header && <div className="card-header">{header}</div>}
        <div className="card-body">{children}</div>
        {footer && <div className="card-footer">{footer}</div>}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
