import React, { useState } from 'react';

const sharedInputClasses = "ml-4 p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg";
const sharedButtonClasses = "bg-blue-500 text-white p-2 rounded-lg mt-4";
const sharedTextClasses = "text-white font-bold";
const sharedCheckboxClasses = "block bg-zinc-300 dark:bg-zinc-600 w-14 h-8 rounded-full";

const SubmitForm = () => {
    const [isSafe, setIsSafe] = useState(false);

    const handleCheckboxChange = () => {
        setIsSafe(!isSafe);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-zinc-100 dark:bg-zinc-800">
            <h1 className="text-2xl font-bold text-center mb-4">Please submit how you are today</h1>
            <div className="flex flex-col items-center justify-center">
                <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className={sharedTextClasses}>Stress</span>
                    </div>
                    <input type="text" placeholder="Optional" className={sharedInputClasses} />
                </div>
                
                <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                        <span className={sharedTextClasses}>Sleep</span>
                    </div>
                    <input type="text" placeholder="Optional" className={sharedInputClasses} />
                </div>
                
                <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className={sharedTextClasses}>Mood</span>
                    </div>
                    <input type="text" placeholder="Optional" className={sharedInputClasses} />
                </div>
                
                <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className={sharedTextClasses}>Gratitude</span>
                    </div>
                    <input type="text" placeholder="Optional" className={sharedInputClasses} />
                </div>
            </div>

            <button className={sharedButtonClasses}>Submit</button>

            <div className="flex items-center justify-center mt-8">
                <span className="text-zinc-600 dark:text-zinc-400">Safe</span>
                <label htmlFor="rocker" className="flex items-center cursor-pointer ml-4">
                    <div className="relative">
                        <input type="checkbox" id="rocker" className="sr-only" onChange={handleCheckboxChange} />
                        <div className={sharedCheckboxClasses}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isSafe ? 'transform translate-x-full' : ''}`}></div>
                    </div>
                </label>
                <span className="text-red-600 dark:text-red-400 ml-4">Not Safe</span>
            </div>

            <button className={sharedButtonClasses}>Submit</button>
        </div>
    );
};

export default SubmitForm;
