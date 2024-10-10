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

    //Supabase is a backend as a service package. Everything is self contained within supabase
    //Implementing auth via supabase is easy because it has its own
    //allows for google signin, email signin, and more
    //Has row level security - only correct users can access their own data. allows more security

    //alternatives - firebase. firebase is a document database model. supabase is a relational database model using postgres