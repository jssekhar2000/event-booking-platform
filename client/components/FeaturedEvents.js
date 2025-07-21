"use client";

import { useEffect, useState } from "react";
import axios from '@/lib/axios';
import EventCard from "@/components/EventCard";

const categoryImages = {
  Music:
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
  Tech:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
  Food:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
  Business:
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800",
  Sports:
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
  default:
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop&auto=format",
};

export default function FeaturedEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          '/events'
        );
        console.log(res,'===================');
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
        console.error("Failed to fetch events", error);
      }
    };

    fetchEvents();
  }, []);

  return (
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
        <button className="inline-flex items-center justify-center gap-2 text-sm font-medium border bg-white hover:bg-gray-100 text-gray-800 h-10 rounded-md px-6 transition">
          View All Events
        </button>
      </div>
    </div>
  );
}
