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
    dateRange: 'all',
    sortBy: 'date'
  });
  const [searchText, setSearchText] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEvents: 0,
    eventsPerPage: 6
  });

  useEffect(() => {
    const fetchFilteredEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/events', {
          params: {
            categories: filters.categories.join(','),
            locations: filters.locations.join(','),
            search: searchText,
            dateRange: filters.dateRange,
            sortBy: filters.sortBy,
            page: pagination.currentPage,
            limit: pagination.eventsPerPage,
          },
        });

        const mapped = res?.data?.events?.map((event) => {
          const dateObj = new Date(event?.date);
          const booked = event.totalTickets - event.availableTickets;
        
          return {
            id: event?.id,
            title: event?.title,
            shortDescription: event?.shortDescription,
            date: dateObj.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            time: dateObj.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            category: event.category,
            venue: event.location,
            image: event.imageUrl || categoryImages[event.category] || categoryImages.default,
            organizer: event.vendor?.vendorName || "Unknown Organizer",
            attendees: `${booked}/${event.totalTickets} attendees`,
            price: event.price,
          };
        }) || [];

        setEvents(mapped);
        setPagination(prev => ({
          ...prev,
          totalPages: res?.data?.totalPages || 1,
          totalEvents: res?.data?.totalEvents || 0
        }));
      } catch (err) {
        console.error(err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredEvents();
  }, [filters, searchText, pagination.currentPage]);

  const handleSearch = (searchData) => {
    setSearchText(searchData);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          pagination={pagination}
          onPageChange={handlePageChange}
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
      </div>
    </div>
  );
}