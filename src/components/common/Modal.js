

// ============================================
// frontend/src/components/common/Modal.jsx
// ============================================
import React from 'react';
import './Modal.css';
import { createPortal } from 'react-dom';

/**
 * Modal Component
 * Overlay dialog box
 */

const Modal = React.forwardRef(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      footer,
      size = 'md',
      className = '',
      closeButton = true,
      ...props
    },
    ref
  ) => {
    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }

      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    const modalContent = (
      <div className="modal-backdrop" onClick={onClose}>
        <div
          className={`modal modal--${size} ${className}`}
          onClick={(e) => e.stopPropagation()}
          ref={ref}
          {...props}
        >
          {(title || closeButton) && (
            <div className="modal-header">
              {title && <h2 className="modal-title">{title}</h2>}
              {closeButton && (
                <button
                  className="modal-close"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          <div className="modal-body">{children}</div>

          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    );

    return createPortal(modalContent, document.body);
  }
);

Modal.displayName = 'Modal';

// export default Modal;


// ============================================
// frontend/src/components/common/Divider.jsx
// ============================================

import './Divider.css';

/**
 * Divider Component
 * Horizontal or vertical separator
 */

const Divider = ({ type = 'horizontal', text = null, className = '', ...props }) => {
  const dividerClasses = [
    'divider',
    `divider--${type}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (text) {
    return (
      <div className="divider-with-text">
        <div className="divider-line"></div>
        <span className="divider-text">{text}</span>
        <div className="divider-line"></div>
      </div>
    );
  }

  return <hr className={dividerClasses} {...props} />;
};

export default Divider;
