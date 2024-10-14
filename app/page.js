import React from "react";
import Button from './components/Button/Button';
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center text-[#ede9fe] bg-gradient-to-b from-purple-900 via-purple-700 to-purple-900">
      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
        <div>
          <div className="w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-purple-800 rounded-full opacity-20"></div>
        </div>
        <div className="absolute">
          <div className="w-36 h-36 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-purple-700 rounded-full opacity-30"></div>
        </div>
      </div>

      <div className="z-10 flex flex-col items-center">
        <h1 className="font-silkscreen text-4xl sm:text-6xl md:text-8xl mb-4 sm:mb-6 animate-fade-in-up">QuizPulse</h1>
        <h2 className="text-lg sm:text-2xl md:text-4xl mb-8 sm:mb-12 text-center animate-fade-in-up animation-delay-200">
          How many questions can <span className="text-pink-400">YOU</span> answer in 3 minutes?
        </h2>
        <Link href="/homepage">
          <Button
            text="Continue as Guest"
            background="bg-pink-600 hover:bg-pink-700"
            className="text-lg sm:text-xl md:text-2xl px-6 sm:px-8 py-3 sm:py-4 rounded-full"
          />
        </Link>
        <Link href="/leaderboard">
          <Button
            text="Leaderboard"
            background="m-2 sm:m-3 bg-pink-600 hover:bg-pink-700"
            className="text-base sm:text-lg md:text-xl px-6 py-3 rounded-full"
          />
        </Link>
      </div>
    </div>
  );
}
