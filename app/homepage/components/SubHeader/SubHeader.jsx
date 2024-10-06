"use client";

import React from 'react';
import Timer from '../GameTimer/GameTimer';

export default function SubHeader({ score, progress, lives }) {
    return (
        <div className="bg-opacity-0 absolute top-0 flex justify-between p-4 w-full max-w-full overflow-hidden text-2xl sm:text-xl text-[#ede9fe] bg-[#4C0827]">
            <h2>Progress: {progress}/15</h2>
            <h2>Score: {score}</h2>
            <h2>Lives: {lives}</h2>
            <h2>Time left: <Timer /></h2>
        </div>
    );
}