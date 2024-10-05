'use client';

import React from "react";
import Ready from "./components/ReadyScreen/ReadyScreen";
import { useState } from "react";

export default function Quiz() {
    const [showTimer, setShowTimer] = useState(true);

    const handleTimerEnd = () => {
        setShowTimer(false);
    };
    return (
        <div className="relative h-screen flex flex-col items-center justify-between p-24 text-4xl 
                        sm:text-6xl text-[#ede9fe] bg-[#4C0827]">
        {showTimer? (
            <Ready onTimerEnd={handleTimerEnd} />
        ) : (
            <div>Quiz</div>
        )}
        </div>
    );
}
