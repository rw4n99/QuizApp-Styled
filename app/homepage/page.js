'use client';

import React from "react";
import Ready from "./components/ReadyScreen/ReadyScreen";
import QuestionCards from "./components/QuestionCards/QuestionCards";
import { useState } from "react";

export default function Quiz() {
    const [showTimer, setShowTimer] = useState(true);

    const handleTimerEnd = () => {
        setShowTimer(false);
    };
    return (
        <div className="relative h-screen flex flex-col w-full max-w-full overflow-hidden
                        text-[#ede9fe] bg-[#4C0827]">
        {showTimer? (
            <Ready onTimerEnd={handleTimerEnd} />
        ) : (
            <QuestionCards/>
        )}
        </div>
    );
}
