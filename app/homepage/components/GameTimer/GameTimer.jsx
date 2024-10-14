import React, { useState, useEffect } from 'react';
import EndGamePass from '../EndGamePass/EndGamePass';

// Timer component
const Timer = ({ score }) => { 
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(2);
  const [isActive, setIsActive] = useState(true);
  const [isEndGame, setIsEndGame] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(prevSeconds => prevSeconds - 1);
        } else if (seconds === 0 && minutes > 0) {
          setMinutes(prevMinutes => prevMinutes - 1);
          setSeconds(59);
        } else {
          clearInterval(interval);
          setIsActive(false);
          setIsEndGame(true);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isEndGame]);

  return (
    <div>
      <div className="bg-opacity-0 text-xl text-[#ede9fe] bg-[#4C0827]">
        Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds} minutes
      </div>
      <div>
        {isEndGame && <EndGamePass score={score} />}
      </div>
    </div>    
  );
};

export default Timer;
