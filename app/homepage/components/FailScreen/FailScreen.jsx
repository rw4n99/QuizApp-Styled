"use client";

import React from 'react';
import Button from '../Button/Button';

export default function FailScreen({ onClose , correctAnswerVar}) {
    return (
        <div>
            <p>
               ❌ Incorrect. ❌ </p>
            <p> The correct answer was {correctAnswerVar} </p>
            <Button
                onClick={onClose}>
                    Next Question
            </Button>
        </div>
    );
}
