import { RefObject, useEffect } from 'react';

export const useRefScrollListener = (
  ref: RefObject<HTMLDivElement | null>,
  callback: (e: Event) => void,
  startToWatch = true,
) => {
  useEffect(() => {
    if (startToWatch) {
      document.addEventListener('scroll', callback);
    } else {
      document?.removeEventListener('scroll', callback);
    }

    return () => {
      if (document) document.removeEventListener('scroll', callback);
    };
  }, [callback, startToWatch, ref]);
};
