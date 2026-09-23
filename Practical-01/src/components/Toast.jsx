import React, { useEffect } from 'react';

function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast-notification toast-${type}`}>
      <span className="toast-icon">
        {type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
      </span>
      <span className="toast-text">{message}</span>
      <button type="button" className="toast-close-btn" onClick={onClose}>
        ✕
      </button>
    </div>
  );
}

export default Toast;
