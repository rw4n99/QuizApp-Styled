'use client'; // Must be the very first line

import React, { useEffect, useState } from 'react'; // All imports should be after 'use client'
import { createClient } from '@supabase/supabase-js';
import BarChart from './components/BarChart/BarChart';

// Initialize Supabase client
const supabaseUrl = 'https://gblyecsjjpamtbjrlwli.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdibHllY3NqanBhbXRianJsd2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMjg1OTYsImV4cCI6MjA0MzgwNDU5Nn0.zDuVgamSFVktx0TlS-PxRwqlv2hREJzUypMR9Ro8nLE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function Leaderboard() {
    const [data, setData] = useState([]);
    const [top3, setTop3] = useState([]);
    const [loading, setLoading] = useState(true);

    // Sort top 3 users by score
    const sortedTop3 = top3 ? [...top3].sort((a, b) => b.user_score - a.user_score) : [];
    const reorderedTop3 = [
    sortedTop3[1],
    sortedTop3[0],
    sortedTop3[2] 
    ];

    // Get usernames for top 3 users
    const usernames = reorderedTop3.map(user => user?.user_name || 'Unknown');
    const scores = reorderedTop3.map(user => user?.user_score || 0);

    // Fetch leaderboard data on component mount
    useEffect(() => {
        fetchLeaderBoardData();
    }, []);

    const fetchLeaderBoardData = async () => {
        try {
            // Fetch leaderboard data from Supabase
            const { data: leaderBoardData, error } = await supabase
                .from('leaderboard') 
                .select('user_name, user_score, time_left, time_stamp') 
                .order('user_score', { ascending: false });

            if (error) throw error;

            setData(leaderBoardData);
            setTop3(leaderBoardData.slice(0, 3));
        } catch (error) {
            console.error('Sorry, we cannot find the data', error.message);
        } finally {
            setLoading(false);
        }
    };

    // Display only the top 3 users to be used in component
    const barData = {
        labels: usernames, scores,
        datasets: [
            {
                label: 'Top 3 Users',
                data: reorderedTop3 ? reorderedTop3.map(user => user?.user_score || 0) : [0, 0, 0],
                backgroundColor: ['#C0C0C0', '#FFD700', '#FF5733'],
                barThickness: 100,
            },
        ]
    }

    return (
        <div className="relative flex flex-col items-center justify-top text-[#ede9fe] bg-gradient-to-b from-purple-900 via-purple-700 to-purple-900">
            <h1 className="font-silkscreen text-5xl sm:text-7xl mb-6 mt-10">LeaderBoard</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="w-full max-w-3xl p-4">
                    <div className="mb-6">
                        <BarChart data={barData} />
                    </div>
                <ul className="space-y-4">
                    {data.map((user, index) => (
                        <li key={index} className="bg-pink-600 p-4 rounded-lg">
                            <p className="font-semibold text-lg">User Name: {user.user_name}</p>
                            <p className="text-gray-700">Score: {user.user_score}</p>
                            <p className="text-gray-500">Remaining time: {user.time_left}</p>
                        </li>
                    ))}
                </ul>
                </div>
                
            )}
        </div>
    );
}

export default Leaderboard;
