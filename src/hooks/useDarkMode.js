import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(value));
  }, [value]);

  const toggle = () => setValue((prev) => !prev);

  return { value, toggle };
};

export default useDarkMode;
