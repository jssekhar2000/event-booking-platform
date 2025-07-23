'use client';

import EventCard from '@/components/EventCard';
import { Grid, List, ChevronDown, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import Loader from '@/components/Loader';

export default function SearchResults({ events, loading }) {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'rating', label: 'Rating' }
  ];

  const getCurrentSortLabel = () => {
    return sortOptions.find(option => option.value === sortBy)?.label || 'Date';
  };


  if (loading) {
    return (
      <div className="flex-1">
        <div className="bg-white border-b border-gray-200 pb-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Search Results
              </h1>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full w-fit">
                Searching...
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  disabled
                  className="flex items-center gap-2 px-4 py-2 w-48 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed"
                >
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  <span className="flex-1 text-left">{getCurrentSortLabel()}</span>
                  <ChevronDown className="w-4 h-4 text-gray-300" />
                </button>
              </div>

              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  disabled
                  className="flex items-center justify-center w-8 h-8 rounded-md bg-white text-gray-400 shadow-sm cursor-not-allowed"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  disabled
                  className="flex items-center justify-center w-8 h-8 rounded-md text-gray-400 cursor-not-allowed"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-96">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="bg-white border-b border-gray-200 pb-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Search Results
            </h1>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full w-fit">
              {events.length} events found
            </span>
          </div>
          
          <div className="flex items-center gap-3">

            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-4 py-2 w-48 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
              >
                <ArrowUpDown className="w-4 h-4 text-gray-500" />
                <span className="flex-1 text-left">{getCurrentSortLabel()}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          sortBy === option.value 
                            ? 'text-blue-600 bg-blue-50 font-medium' 
                            : 'text-gray-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>


            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>


      {showSortDropdown && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setShowSortDropdown(false)}
        />
      )}


      {events.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-300 mb-6">
            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">No events found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            We couldn't find any events matching your criteria. Try adjusting your filters or search terms to discover more events.
          </p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid'
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }>
          {events.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {events.length > 0 && (
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            Load More Events
          </button>
        </div>
      )}
    </div>
  );
}