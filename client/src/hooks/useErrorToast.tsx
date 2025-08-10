import { useState, useEffect } from 'react';

export function useErrorToast(timeout = 5000) {
    
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Show toast with message, auto hide after timeout
  const showError = (errorMsg: string) => {
    setMessage(errorMsg);
    setIsVisible(true);
  };

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setMessage(null);
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [isVisible, timeout]);

  return { isVisible, message, showError };
}