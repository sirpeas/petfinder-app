import { useEffect } from 'react';

export const useKeyDownListener = (callback: (e: KeyboardEvent) => void, startToWatch = true) => {
  useEffect(() => {
    if (startToWatch) {
      document.addEventListener('keydown', callback);
    } else {
      document.removeEventListener('keydown', callback);
    }

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [callback, startToWatch]);
};
