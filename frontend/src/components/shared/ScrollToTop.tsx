'use client';

import React from 'react';

const ScrollToTop = () => {
    return (
        <div className="fixed bottom-8 right-8">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </div>
    );
};

export default ScrollToTop;
