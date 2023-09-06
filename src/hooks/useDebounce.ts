import { useState, useEffect } from 'react';
import { DEBOUNCE_DELAY_MILLISECONDS } from '../constants';

const useDebounce = (value: string, delay = DEBOUNCE_DELAY_MILLISECONDS) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
