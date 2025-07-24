'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const eventCategories = [
  { value: 'music', label: 'Music' },
  { value: 'technology', label: 'Technology' },
  { value: 'food-drink', label: 'Food & Drink' },
  { value: 'arts-culture', label: 'Arts & Culture' },
  { value: 'sports', label: 'Sports' },
  { value: 'business', label: 'Business' }
];

const eventLocations = [
  { value: 'new-york', label: 'New York' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'miami', label: 'Miami' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'austin', label: 'Austin' }
];

const ratingOptions = [
  { value: '4+', label: '4+ Stars' },
  { value: '3+', label: '3+ Stars' },
  { value: '2+', label: '2+ Stars' },
  { value: '1+', label: '1+ Stars' }
];

const dateOptions = [
  { value: 'all', label: 'All Dates' },
  { value: 'today', label: 'Today' },
  { value: 'this-week', label: 'This Week' },
  { value: 'this-month', label: 'This Month' },
  { value: 'next-month', label: 'Next Month' }
];

export default function SearchSidebar({ filters, setFilters }) {
  const [selectedCategories, setSelectedCategories] = useState(filters?.categories || []);
  const [selectedLocations, setSelectedLocations] = useState(filters?.locations || []);
  const [priceRange, setPriceRange] = useState(500);
  const [dateRange, setDateRange] = useState(filters?.dateRange || 'all');
  const [selectedRating, setSelectedRating] = useState('');

  useEffect(() => {
    if (filters) {
      setSelectedCategories(filters.categories || []);
      setSelectedLocations(filters.locations || []);
      setDateRange(filters.dateRange || 'all');
    }
  }, [filters]);

  const handleCategoryChange = (categoryValue) => {
    const updatedCategories = selectedCategories.includes(categoryValue)
      ? selectedCategories.filter(cat => cat !== categoryValue)
      : [...selectedCategories, categoryValue];
    
    setSelectedCategories(updatedCategories);
    updateParentFilters({ 
      categories: updatedCategories, 
      locations: selectedLocations,
      dateRange: dateRange,
      sortBy: filters?.sortBy || 'date'
    });
  };

  const handleLocationChange = (locationValue) => {
    const updatedLocations = selectedLocations.includes(locationValue)
      ? selectedLocations.filter(loc => loc !== locationValue)
      : [...selectedLocations, locationValue];
    
    setSelectedLocations(updatedLocations);
    updateParentFilters({ 
      categories: selectedCategories, 
      locations: updatedLocations,
      dateRange: dateRange,
      sortBy: filters?.sortBy || 'date'
    });
  };

  const handlePriceRangeChange = (newPrice) => {
    setPriceRange(newPrice);
  };

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
    updateParentFilters({ 
      categories: selectedCategories, 
      locations: selectedLocations,
      dateRange: newDateRange,
      sortBy: filters?.sortBy || 'date'
    });
  };

  const handleRatingChange = (ratingValue) => {
    const newRating = selectedRating === ratingValue ? '' : ratingValue;
    setSelectedRating(newRating);
  };

  const updateParentFilters = (newFilters) => {
    if (setFilters) {
      setFilters(newFilters);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    setPriceRange(500);
    setDateRange('all');
    setSelectedRating('');
    updateParentFilters({ 
      categories: [], 
      locations: [], 
      dateRange: 'all',
      sortBy: 'date'
    });
  };

  const hasActiveFilters = 
    selectedCategories.length > 0 ||
    selectedLocations.length > 0 ||
    priceRange < 500 ||
    dateRange !== 'all' ||
    selectedRating !== '';

  const pricePercentage = (priceRange / 500) * 100;

  return (
    <aside className="w-64 bg-white border border-gray-200 rounded-lg p-6 h-fit shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>
      
      <div className="mb-8">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-3">
          {eventCategories.map((category) => (
            <label key={category.value} className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.value)}
                  onChange={() => handleCategoryChange(category.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 border-2 rounded ${
                  selectedCategories.includes(category.value)
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-gray-300 group-hover:border-gray-400'
                } transition-colors duration-200`}>
                  {selectedCategories.includes(category.value) && (
                    <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                {category.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Locations</h3>
        <div className="space-y-3">
          {eventLocations.map((location) => (
            <label key={location.value} className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(location.value)}
                  onChange={() => handleLocationChange(location.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 border-2 rounded ${
                  selectedLocations.includes(location.value)
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-gray-300 group-hover:border-gray-400'
                } transition-colors duration-200`}>
                  {selectedLocations.includes(location.value) && (
                    <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                {location.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Price Range</h3>
        <div className="px-1">
          <div className="relative">
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange}
              onChange={(e) => handlePriceRangeChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${pricePercentage}%, #e5e7eb ${pricePercentage}%, #e5e7eb 100%)`
              }}
            />
          </div>
          <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
            <span>$0</span>
            <div className="text-sm font-semibold text-gray-700">
              ${priceRange}
            </div>
            <span>$500+</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Date Range</h3>
        <div className="relative">
          <select
            value={dateRange}
            onChange={(e) => handleDateRangeChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white appearance-none cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          >
            {dateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Minimum Rating</h3>
        <div className="space-y-3">
          {ratingOptions.map((rating) => (
            <label key={rating.value} className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="radio"
                  name="rating"
                  checked={selectedRating === rating.value}
                  onChange={() => handleRatingChange(rating.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 border-2 rounded-full ${
                  selectedRating === rating.value
                    ? 'border-blue-600'
                    : 'border-gray-300 group-hover:border-gray-400'
                } transition-colors duration-200`}>
                  {selectedRating === rating.value && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                </div>
              </div>
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                {rating.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={clearAllFilters}
          disabled={!hasActiveFilters}
          className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
            hasActiveFilters
              ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 active:bg-red-200'
              : 'bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed'
          }`}
        >
          Clear All Filters
        </button>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          border: 2px solid white;
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .slider::-webkit-slider-track {
          height: 8px;
          border-radius: 4px;
        }

        .slider::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          background: transparent;
        }
      `}</style>
    </aside>
  );
}