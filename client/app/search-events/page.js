'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import SearchSidebar from './SearchSideBar';
import SearchResults from './SearchResults';
import { categoryImages } from '@/lib/constants';
import SearchTopBar from './SearchTopBar';

export default function SearchPage() {
  const [filters, setFilters] = useState({
    categories: [],
    locations: [],
  });
  const [searchText, setSearchText] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilteredEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/events', {
          params: {
            categories: filters.categories.join(','),
            locations: filters.locations.join(','),
            search: searchText,
          },
        });

        const mapped = res.data.map((event) => {
          const dateObj = new Date(event.date);
          return {
            id: event.id,
            title: event.title,
            description: event.description,
            date: dateObj.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            time: dateObj.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            category: event.category,
            venue: event.location,
            image: categoryImages[event.category] || categoryImages.default,
            organizer: event.vendor?.vendorName || 'Unknown Organizer',
            attendees: `${500 - event.availableTickets}/500 attendees`,
            price: 50 + event.id * 10,
          };
        });

        setEvents(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredEvents();
  }, [filters, searchText]);

  const handleSearch = (searchData) => {
    setSearchText(searchData);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <SearchTopBar onSearch={handleSearch} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        <SearchSidebar 
          filters={filters} 
          setFilters={handleFiltersChange} 
        />
        <SearchResults 
          events={events} 
          loading={loading}
        />
      </div>
    </div>
  );
}