import React, { useState, useContext, useEffect } from 'react';

// Create a TimeContext to provide the current time
const TimeContext = React.createContext();

export const useTime = () => {
  return useContext(TimeContext);
};

export const TimeProvider = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <TimeContext.Provider value={{ time: currentTime.toLocaleTimeString() }}>
      {children}
    </TimeContext.Provider>
  );
};
