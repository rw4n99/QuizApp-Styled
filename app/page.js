import Image from "next/image";
import React from "react";
import Button from './components/Button/Button';
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen flex flex-col items-center justify-between p-24 text-4xl 
                    sm:text-6xl text-[#ede9fe] bg-[#4C0827]">
      <div className="flex flex-col items-center">
        <h1 className="font-silkscreen order-1">MindSpark</h1>
        <h2 className="text-3xl order-2 mt-11 text-center">Can YOU beat the boss?</h2>
      </div>
      <Link href="/homepage">
        <Button
          text='Continue as guest'
          background='bg-[#80D39B]'
        />
      </Link>
    </div>
  );
}
