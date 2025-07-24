'use client';

import Link from 'next/link';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { categoryImages } from '@/lib/constants';

export default function UserBookingCard({ booking, onCancel }) {
  const event = booking.event;
  const eventDate = new Date(event.date);

  const [imgError, setImgError] = useState(false);
  const fallbackImage = categoryImages?.[event?.category] || categoryImages.default;

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(eventDate);

  const isPastEvent = new Date(event.date) < new Date();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      <div className="relative w-full h-48 bg-gray-100 flex-shrink-0">
        <img
          src={imgError ? fallbackImage : (event.imageUrl || fallbackImage)}
          alt={event.title}
          className="w-full h-full object-cover rounded-t-xl"
          onError={() => setImgError(true)}
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
          {event.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {event.shortDescription}
        </p>

        <div className="space-y-2 text-sm text-gray-700 mb-4 flex-grow">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span>Booked Price: ${booking.price}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
          <Link href={`/events/${event.id}`} passHref>
            <button className="flex-1 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium">
              View Details
            </button>
          </Link>
          {!isPastEvent && (
            <button
              onClick={() => onCancel(booking)}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
}