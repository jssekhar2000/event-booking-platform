'use client';

import { useState } from 'react';

export default function SearchTopBar({ onSearch }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(text);
  };

  return (
    <div className="bg-white py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div
        className="max-w-4xl mx-auto flex items-center gap-4"
      >
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search events..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e);
              }
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-800 placeholder-gray-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-md transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}