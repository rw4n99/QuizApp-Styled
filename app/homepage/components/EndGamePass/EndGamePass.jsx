import React from "react";
import Button from '../Button/Button';
import Link from "next/link";

export default function EndGamePass ({ score, lives }) {
    
    const handleClick = () => {
        window.location.reload();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-teal-300 z-10 text-white">
            <div className="text-center p-8 bg-teal-700 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-2">Time's up!</h1>
                <h2 className="text-2xl mb-6">Let's see how you did...</h2>
                <h2 className="text-2xl mb-4">Final Score: {score}</h2>
                <h2 className="text-2xl mb-6">Lives Left: {lives}</h2>
                <Button 
                    onClick={handleClick} 
                    text="Submit score" 
                    background="bg-purple-600 hover:bg-purple-700"
                    className="px-6 py-2 text-xl text-white rounded-lg"
                />
                <Link href="/leaderboard">
                <Button
                    text="Leaderboard"
                    background="m-3 bg-pink-600 hover:bg-pink-700"
                />
                </Link>
            </div>
        </div>
    );
}
