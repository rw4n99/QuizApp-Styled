import React from "react";

export default function Button({ text, background, onClick , position}) {
    return (
        <div>
            <button
                className={`${background} ${position} text-white text-xl py-2 px-14 rounded-2xl`}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    );
}
