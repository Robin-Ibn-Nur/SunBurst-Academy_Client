import React from 'react';

const SplashLoader = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex space-x-4">
                <div className="w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-6 h-6 bg-red-500 rounded-full animate-bounce"></div>
                <div className="w-6 h-6 bg-green-500 rounded-full animate-bounce"></div>
            </div>
        </div>
    );
};

export default SplashLoader;