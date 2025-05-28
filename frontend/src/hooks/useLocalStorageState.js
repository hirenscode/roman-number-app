import { useState, useEffect } from "react";

function useLocalStorageState(key, defaultValue) {
    const [value, setValue] = useState(() => {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        return JSON.parse(storedValue);
      } else {
        return defaultValue;
      }
    });
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
  
    return [value, setValue];
}
  
export default useLocalStorageState;
  