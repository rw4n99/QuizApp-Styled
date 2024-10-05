'use client';

import React, { useState, useEffect } from "react";

export default function Ready({ onTimerEnd }) {
    const [seconds, setSeconds] = useState(3);
    const [isActive, setIsActive] = useState(true);
    const [start, setStart] = useState(false);

    const radius = 50;
    const circumference = 2 * Math.PI * radius;

    const progress = (seconds / 3) * circumference;

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds > 0) {
                        return prevSeconds - 1;
                    } else {
                        setStart(true);
                        clearInterval(interval);
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive]);

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
