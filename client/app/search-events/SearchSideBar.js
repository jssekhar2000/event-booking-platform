'use client';

import { eventCategories, eventLocations } from '@/lib/constants';
import { useState } from 'react';

export default function SearchSidebar({ filters, setFilters }) {
  const handleCheckbox = (type, value) => {
    setFilters((prev) => {
      const list = new Set(prev[type]);
      list.has(value) ? list.delete(value) : list.add(value);
      return { ...prev, [type]: [...list] };
    });
  };

  return (
    <aside className="w-full max-w-xs bg-white p-4 border rounded-lg">
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Categories</h3>
        {eventCategories.slice(1).map((cat) => (
          <div key={cat.value} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.categories.includes(cat.value)}
              onChange={() => handleCheckbox('categories', cat.value)}
            />
            <label>{cat.label}</label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Locations</h3>
        {eventLocations.slice(1).map((loc) => (
          <div key={loc.value} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.locations.includes(loc.value)}
              onChange={() => handleCheckbox('locations', loc.value)}
            />
            <label>{loc.label}</label>
          </div>
        ))}
      </div>

      {/* You can add price range, date range and rating filter here similarly */}
    </aside>
  );
}
