import React from "react";
import Button from '../Button/Button';

export default function EndGame ({ score, progress, lives }) {
    
    const handleClick = () => {
        window.location.reload();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white">
            <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-6">Game Over ☠</h1>
                <h2 className="text-2xl mb-4">Progress: {progress}/15</h2>
                <h2 className="text-2xl mb-4">Final Score: {score}</h2>
                <h2 className="text-2xl mb-6">Lives Left: {lives}</h2>
                <Button 
                    onClick={handleClick} 
                    text="Try again" 
                    background="bg-red-600 hover:bg-red-700"
                    className="px-6 py-2 text-xl text-white rounded-lg"
                />
            </div>
        </div>
    );
}
