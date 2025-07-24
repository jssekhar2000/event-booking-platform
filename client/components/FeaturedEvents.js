"use client";

import { useEffect, useState } from "react";
import axios from '@/lib/axios';
import EventCard from "@/components/EventCard";
import Loader from "@/components/Loader";
import HeroSection from "./HeroSection";
import { categoryImages } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturedEvents() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEvents: 0,
    eventsPerPage: 6
  });

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/events', {
          params: {
            search: filters.search,
            category: filters.category,
            location: filters.location,
            page: pagination.currentPage,
            limit: pagination.eventsPerPage
          }
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
      } catch (error) {
        console.error(error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filters, pagination.currentPage]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '', location: '' });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const generatePageNumbers = () => {
    const pages = [];
    const { currentPage, totalPages } = pagination;
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (loading) {
    return <Loader />;
  }

  const hasActiveFilters = filters.search || filters.category || filters.location;

  return (
    <>
      <HeroSection onSearch={handleFiltersChange} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            {hasActiveFilters ? 'Search Results' : 'Featured Events'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {hasActiveFilters 
              ? `${pagination.totalEvents} events matching your search criteria` 
              : 'Discover the most popular events happening near you'
            }
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-300 mb-6">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-8 0H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2m-8 0V7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {hasActiveFilters ? 'No events found' : 'No events available'}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {hasActiveFilters 
                ? "We couldn't find any events matching your search criteria. Try adjusting your filters to discover more events."
                : "There are currently no featured events available. Please check back later for exciting new events."
              }
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white h-10 rounded-md px-6 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="flex items-center justify-center w-10 h-10 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {generatePageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' && handlePageChange(page)}
                      disabled={page === '...'}
                      className={`flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                        page === pagination.currentPage
                          ? 'bg-blue-600 text-white'
                          : page === '...'
                          ? 'text-gray-400 cursor-default'
                          : 'text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="flex items-center justify-center w-10 h-10 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </nav>
              </div>
            )}

            <div className="text-center mt-8">
              <button 
                onClick={() => router.push('/search-events')}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 h-10 rounded-md px-6 transition"
              >
                View All Events
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}