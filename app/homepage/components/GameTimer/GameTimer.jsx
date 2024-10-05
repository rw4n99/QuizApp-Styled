import React, { useState, useEffect } from 'react';

const Timer = ({ onTimerEnd }) => {
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(4);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(prevSeconds => prevSeconds - 1);
        } else if (seconds === 0 && minutes > 0) {
          setMinutes(prevMinutes => prevMinutes - 1);
          setSeconds(59);
        }
      }, 1000);
    }
    
    if (minutes === 0 && seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
      onTimerEnd();
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, onTimerEnd]);

  return (
    <div>
        <div>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds} minutes
        </div>
    </div>
  );
};

export default Timer;
