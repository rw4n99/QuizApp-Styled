'use client';

import React, { useState, useEffect } from "react";

// Ready component
export default function Ready({ onTimerEnd }) {
    const [seconds, setSeconds] = useState(3);
    const [isActive, setIsActive] = useState(true);
    const [start, setStart] = useState(false);
    //Loading circle
    const radius = 50;
    const circumference = 2 * Math.PI * radius;

    const progress = (seconds / 3) * circumference;

    useEffect(() => {
    // Declare a variable to store the interval
    let interval = null; 

    // If the timer is active, start the countdown
    if (isActive) { 
        // Set an interval to run the following function every 1 second
        interval = setInterval(() => { 
            // Update the 'seconds' state by accessing its previous value
            setSeconds(prevSeconds => { 
                // If there are more than 0 seconds remaining
                if (prevSeconds > 0) { 
                    // Decrease the seconds by 1
                    return prevSeconds - 1; 
                } else {
                    // When the timer reaches 0, trigger some logic (e.g., end the game)
                    setStart(true); 
                    // Clear the interval to stop the countdown
                    clearInterval(interval); 
                    // Ensure the seconds state is set to 0
                    return 0; 
                }
            });
        }, 1000); // The interval runs every 1 second (1000 ms)
    }

    // Cleanup function: clear the interval when the component unmounts or the effect re-runs
    return () => clearInterval(interval); 
}, [isActive]); // This effect depends on the 'isActive' value, re-running if it changes


    useEffect(() => {
        if (start) {
            onTimerEnd();
        }
    }, [start, onTimerEnd]);

    return (
        <div className="flex h-screen items-center justify-center flex-col">
            <div className="text-white text-4xl">Ready?</div>
            <div className="relative flex items-center justify-center">
                <div className="absolute text-6xl text-white">{seconds}</div>
                <svg className="w-32 h-32">
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke="white"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - progress}
                        className="transition-all duration-1000 ease-linear"
                    />
                </svg>
            </div>
        </div>
    );
}
