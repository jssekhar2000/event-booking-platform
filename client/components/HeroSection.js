'use client';

import { useState } from 'react';

export default function HeroSection() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    console.log({ search, category, location });
  };

  return (
    <section className="bg-[#36009D] py-24 px-4 text-white text-center">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-semibold">Discover Amazing Events</h1>
          <p className="text-xl md:text-2xl text-blue-100 mt-2 max-w-2xl mx-auto">
            Book unforgettable experiences from trusted vendors worldwide
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-md p-6 rounded-xl max-w-4xl mx-auto shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search input */}
            <div className="md:col-span-2 relative">
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
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-800 placeholder-gray-500"
                placeholder="Search events..."
              />
            </div>

            {/* Category */}
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 text-gray-800 bg-white"
              >
                <option value="">All Categories</option>
                <option value="Music">Music</option>
                <option value="Technology">Technology</option>
                <option value="Food & Drink">Food & Drink</option>
                <option value="Arts & Culture">Arts & Culture</option>
                <option value="Business">Business</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 text-gray-800 bg-white"
              >
                <option value="">All Locations</option>
                <option value="New York">New York</option>
                <option value="San Francisco">San Francisco</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Miami">Miami</option>
                <option value="Chicago">Chicago</option>
                <option value="Austin">Austin</option>
              </select>
            </div>
          </div>

          {/* Search button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSearch}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-md flex items-center gap-2 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
              Search Events
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
