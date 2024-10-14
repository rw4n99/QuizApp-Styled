'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import BarChart from './components/BarChart/BarChart';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function Leaderboard() {
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
        labels: usernames,
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
            <h1 className="font-silkscreen text-4xl sm:text-5xl md:text-7xl mb-4 sm:mb-6 mt-6 sm:mt-10">LeaderBoard</h1>
            {loading ? (
                <p className="text-lg sm:text-xl">Loading...</p>
            ) : (
                <div className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl p-2 sm:p-4">
                    <div className="mb-4 sm:mb-6">
                        <BarChart data={barData} />
                    </div>
                    <ul className="space-y-3 sm:space-y-4">
                        {data.map((user, index) => (
                            <li key={index} className="bg-pink-600 p-3 sm:p-4 rounded-lg">
                                <p className="font-semibold text-base sm:text-lg">User Name: {user.user_name}</p>
                                <p className="text-gray-700 text-sm sm:text-base">Score: {user.user_score}</p>
                                <p className="text-gray-500 text-xs sm:text-sm">Remaining time: {user.time_left}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Leaderboard;
