"use client";

import { useEffect, useState } from "react";
import axios from '@/lib/axios';
import EventCard from "@/components/EventCard";
import Loader from "@/components/Loader";
import HeroSection from "./HeroSection";
import { categoryImages } from "@/lib/constants";
import { useRouter } from "next/navigation";


export default function FeaturedEvents() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: ''
  });

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/events', {
          params: {
            search: filters.search,
            category: filters.category,
            location: filters.location
          }
        });
  
        const mapped = res?.data?.map((event) => {
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
        });
  
        setEvents(mapped);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, [filters]);

  if (loading) {
    return <Loader />;
  }

 
  const hasActiveFilters = filters.search || filters.category || filters.location;

  return (
    <>
      <HeroSection onSearch={(filters) => setFilters(filters)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            {hasActiveFilters ? 'Search Results' : 'Featured Events'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {hasActiveFilters 
              ? 'Events matching your search criteria' 
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
                onClick={() => setFilters({ search: '', category: '', location: '' })}
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

            <div className="text-center mt-12">
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