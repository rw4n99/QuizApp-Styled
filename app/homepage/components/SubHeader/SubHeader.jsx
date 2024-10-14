"use client";

import React from 'react';

export default function SubHeader({ score, progress, lives }) {
    return (
        <div className="flex p-4 bg-gradient-to-r from-purple-800 to-purple-600 text-white px-16 rounded-full bg-opacity-0 absolute justify-between w-full max-w-full text-xl md:text-xl lg-2xl text-[#ede9fe] bg-[#4C0827]"
>
            <h2>Progress: {progress} answers</h2>
            <h2>Score: {score}</h2>
            {/* <h2>Lives: ❤{lives}</h2> */}
        </div>
    );
}
