'use client';

import EventCard from '@/components/EventCard';

export default function SearchResults({ events }) {
  return (
    <div className="flex-1">
      <h2 className="text-xl font-semibold mb-6">
        {events.length} events found
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <div className="text-center mt-10">
        <button className="bg-white text-purple-700 border px-6 py-2 rounded hover:bg-gray-100">
          Load More Events
        </button>
      </div>
    </div>
  );
}
