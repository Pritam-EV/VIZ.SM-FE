
// ============================================
// frontend/src/components/common/Badge.jsx
// ============================================

import './Badge.css';

/**
 * Badge Component
 * Small label for status or category
 */

const Badge = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const badgeClasses = [
      'badge',
      `badge--${variant}`,
      `badge--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={badgeClasses} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// export default Badge;

