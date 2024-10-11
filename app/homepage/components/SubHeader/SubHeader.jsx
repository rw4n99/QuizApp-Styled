"use client";

import React from 'react';

export default function SubHeader({ score, progress, lives }) {
    return (
        <div className="flex p-6 bg-gradient-to-r from-purple-800 to-purple-600 text-white px-16 rounded-full md bg-opacity-0 absolute top-0 justify-between w-full max-w-full overflow-hidden text-2xl sm:text-xl text-[#ede9fe] bg-[#4C0827]"
>
            <h2>Progress: {progress} answers</h2>
            <h2>Score: {score}</h2>
            {/* <h2>Lives: ❤{lives}</h2> */}
        </div>
    );
}
