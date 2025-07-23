'use client';

import { Calendar, Clock, MapPin, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';
import BookNowButton from './BookNowButton';

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group flex flex-col">

      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image || 'https://source.unsplash.com/400x300/?event'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />


        <div className="absolute top-3 left-3">
          <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-md font-medium">
            Available
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="bg-white/90 text-gray-700 text-xs px-2 py-0.5 rounded-md font-medium">
            {event.category}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">{event.description}</p>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
            <Clock className="w-4 h-4 ml-4" />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{event.organizer}</span>
          </div>

          <div className="text-xs text-gray-500">
            {event.attendees}
          </div>
        </div>

        <div className="flex items-center gap-1 text-purple-700 font-semibold text-sm">
          <DollarSign className="h-4 w-4" />
          <span>{event.price}</span>
        </div>

        <div className="flex gap-2 mt-2">
        <Link href={`/events/${event.id}`} className="flex-1">
          <button className="w-full border border-gray-300 text-sm rounded-md py-1 font-medium hover:bg-gray-100">
            View Details
          </button>
        </Link>

        <BookNowButton eventId={event.id} />
      </div>
      </div>
    </div>
  );
}