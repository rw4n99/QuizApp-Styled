import React from "react";
import Button from './components/Button/Button';
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen flex flex-col items-center justify-center text-[#ede9fe] bg-gradient-to-b from-purple-900 via-purple-700 to-purple-900">
      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
        <div>
          <div className="w-96 h-96 bg-purple-800 rounded-full opacity-20"></div>
        </div>
        <div className="absolute">
          <div className="w-72 h-72 bg-purple-700 rounded-full opacity-30"></div>
        </div>
      </div>

      <div className="z-10 flex flex-col items-center">
        <h1 className="font-silkscreen text-6xl sm:text-8xl mb-6 animate-fade-in-up">QuizPulse</h1>
        <h2 className="text-2xl sm:text-4xl mb-12 text-center animate-fade-in-up animation-delay-200">
          Can <span className="text-pink-400">YOU</span> make it to the top?
        </h2>
        <Link href="/homepage">
          <Button
            text="Continue as Guest"
            background="bg-pink-600 hover:bg-pink-700"
            className="text-xl sm:text-2xl px-8 py-4 rounded-full"
          />
        </Link>
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
