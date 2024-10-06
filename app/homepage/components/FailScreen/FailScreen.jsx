"use client";

import React from 'react';
import Button from '../Button/Button';

export default function FailScreen({ onClose, correctAnswerVar }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-red-500">
            <div className="text-center p-8 bg-white rounded-lg">
                <h1 className="text-3xl font-bold text-red-700">❌ Incorrect. ❌</h1>
                <p className="mt-4 text-red-700">The correct answer was: {correctAnswerVar}</p>
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