import React, { useState, useEffect, createContext, useContext } from 'react';

// Create a context
const DateTimeContext = createContext();

const DateTimeProvider = ({ children }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update the current date and time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Format the time in 12-hour format with AM/PM
  const formattedTime = currentDateTime.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // Display time in 12-hour format with AM/PM
  });

  return (
    <DateTimeContext.Provider value={{ time: formattedTime }}>
      {children}
    </DateTimeContext.Provider>
  );
};

const useTime = () => {
  return useContext(DateTimeContext);
};

export { DateTimeProvider, useTime };
