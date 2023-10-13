import React, { useState, useEffect, createContext, useContext } from 'react';


const DateTimeContext = createContext();

const DateTimeProvider = ({ children }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

 
  const formattedTime = currentDateTime.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, 
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
