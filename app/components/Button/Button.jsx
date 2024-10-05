import React from "react";

export default function buttons({ text, background, handleClick }) {
    return (
        <div>
            <button className={`${background} flex justify-center text-white text-xl py-2 px-14 rounded-2xl`} onClick={handleClick}>
                {text}
            </button>
        </div>
    );
    }