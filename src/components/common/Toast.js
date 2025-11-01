

// ============================================
// frontend/src/components/common/Toast.jsx
// ============================================

import { createPortal } from 'react-dom';
import './Toast.css';

/**
 * Toast Component
 * Notification message
 */

let toastCount = 0;

const Toast = React.forwardRef(
  (
    {
      message,
      type = 'info',
      duration = 3000,
      onClose,
      action,
      id,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
      if (duration && isVisible) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          onClose?.();
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration, isVisible, onClose]);

    const handleClose = () => {
      setIsVisible(false);
      onClose?.();
    };

    if (!isVisible) return null;

    const toastContent = (
      <div
        ref={ref}
        className={`toast toast--${type}`}
        role="alert"
        {...props}
      >
        <div className="toast-content">
          <span className="toast-message">{message}</span>
          {action && (
            <button className="toast-action" onClick={action.onClick}>
              {action.label}
            </button>
          )}
        </div>
        <button
          className="toast-close"
          onClick={handleClose}
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    );

    return createPortal(toastContent, document.body);
  }
);

Toast.displayName = 'Toast';

// export default Toast;

