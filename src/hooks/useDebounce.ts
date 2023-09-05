import { useState, useEffect } from 'react';
import { DELAY_NUMBER } from '../constants';

const useDebounce = (value: string, delay = DELAY_NUMBER) => {
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
