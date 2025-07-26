'use client';

import { Calendar, MapPin, Users, User, Mail, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { categoryImages } from '@/lib/constants';

export default function AdminEventCard({ event, onUpdateStatus }) {
  const [imgError, setImgError] = useState(false);
  const fallbackImage = categoryImages?.[event?.category] || categoryImages.default;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
      <div className="relative h-40 overflow-hidden bg-gray-100">
        <img
          src={imgError ? fallbackImage : (event.imageUrl || fallbackImage)}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
        <div className="absolute top-3 right-3 bg-white/90 text-gray-700 text-xs px-2 py-1 rounded-md font-medium">
          {event.category}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 mb-2">
          {event.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {event.shortDescription}
        </p>

        <div className="space-y-2 text-sm text-gray-600 mb-4 flex-grow">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span>{event.vendor?.vendorName || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 flex-shrink-0" />
            <span>{event.vendor?.user?.name || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span>{event.vendor?.user?.email || 'N/A'}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={() => onUpdateStatus(event.id, 'APPROVED')}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            Approve
          </button>
          <button
            onClick={() => onUpdateStatus(event.id, 'REJECTED')}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}