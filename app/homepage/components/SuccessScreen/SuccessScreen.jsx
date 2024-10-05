"use client";

import React from 'react';
import Button from '../Button/Button';

export default function SuccessScreen({ onClose, score }) {
    return (
        <div>
            <div>
                ✅ Correct! ✅ 
                <p>Your score is: {score}</p>
            </div>
            <Button 
                text="Next Question"
                background="bg-[#80D39B] text-2xl px-8 py-4"
                onClick={onClose}
            />
        </div>
    );
}
