import React, { useEffect, useState } from 'react';

function FlashMessage({ message, onRemove }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (typeof onRemove === 'function') {
          onRemove(); // Notify parent to clear the message
        }
      }, 2000);

      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [message, onRemove]);

  if (!message || !visible) return null;

  const messageStyle = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
  };

  return (
    <div className={`border-l-4 p-4 mb-4 ${messageStyle[message.type]} rounded shadow-md`} role="alert">
      <p className="font-semibold">{message.text}</p>
    </div>
  );
}

export default FlashMessage;
