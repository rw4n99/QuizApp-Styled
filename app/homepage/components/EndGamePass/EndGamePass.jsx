import React from "react";
import Button from '../Button/Button';
import Link from "next/link";
import { useState } from "react";
import { supabase } from  '../../../leaderboard/page';

export default function EndGamePass ({ score, lives }) {

    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [submit, setSubmit] = useState(false);
    

    // Handle click event for submitting score to leaderboard
     const handleClick = async (event) => {
        event.preventDefault();

        const { data, error } = await supabase
            .from('leaderboard')
            .insert([{ user_name: name, user_score: score }])
            .select();
        // If there is an error, set the error state
        if (error) {
            setError(error.message);
            setSuccess(null);
            console.error('Error inserting data:', error);
            console.log(error)
        } else {
            // If successful, set the success state
            setSuccess('Score submitted successfully!');
            setError(null);
            console.log('Inserted data:', data);
            console.log(success)
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-teal-300 z-10 text-white">
            <div className="text-center p-8 bg-teal-700 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-2">Time is up!</h1>
                <h2 className="text-2xl mb-6">This is how you did...</h2>
                <h2 className="text-2xl mb-4">Final Score: {score}</h2>
                <input 
                    className="text-black mb-4" 
                    type="text" 
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />
                <div>
                    {/** Button to submit score**/}
                    {!success ? (<Button 
                    onClick={handleClick} 
                    text="Submit score" 
                    background="bg-purple-600 hover:bg-purple-700"
                    className="px-6 py-2 text-xl text-white rounded-lg"
                />
                ) : null}
                </div>
                {/** Button to leaderboard page**/}
                <Link href="/leaderboard">
                <Button
                    text="Leaderboard"
                    background="m-3 bg-pink-600 hover:bg-pink-700"
                />
                </Link>
                {/**Early exit response messages**/}
                {submit ? (
                    <p>Submitting...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : success ? (
                    <p>{success}</p>
                ) : null}
            </div>
        </div>
    );
}
