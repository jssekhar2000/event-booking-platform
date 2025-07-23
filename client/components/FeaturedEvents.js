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
  
        const mapped = res.data.map((event) => {
          const dateObj = new Date(event.date);
          return {
            id: event.id,
            title: event.title,
            description: event.description,
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
            image: categoryImages[event.category] || categoryImages.default,
            organizer: event.vendor?.vendorName || "Unknown Organizer",
            attendees: `${500 - event.availableTickets}/500 attendees`,
            price: 50 + event.id * 10,
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

  return (
    <>
      <HeroSection onSearch={(filters) => setFilters(filters)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
            Featured Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most popular events happening near you
          </p>
        </div>

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
      </div>
    </>
  );
}
