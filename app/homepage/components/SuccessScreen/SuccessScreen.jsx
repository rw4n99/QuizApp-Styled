"use client";

import React from 'react';
import Button from '../Button/Button';

export default function SuccessScreen({ onClose, score }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-[#28a745]">
            <div className="text-center p-8 bg-white rounded-lg">
                <h1 className="text-3xl font-bold text-green-700">✅ Correct! ✅</h1>
                <p className="mt-4 text-green-700">Your score is: {score}</p>
            </div>
            <div className="mt-6 w-full flex justify-center">
                <Button 
                    text="Next Question"
                    background="bg-[#80D39B]"
                    onClick={onClose}
                    className="w-auto"
                />
            </div>
        </div>
    );
}
