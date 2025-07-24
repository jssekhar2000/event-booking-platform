'use client';

import { Calendar, MapPin, Users, DollarSign, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { categoryImages } from '@/lib/constants';
import { useState } from 'react';

export default function VendorEventCard({ event, onEdit, onDelete }) {
  const [imgError, setImgError] = useState(false);
  const fallbackImage = categoryImages[event?.category] || categoryImages.default;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return price ? `$${price}` : 'Free';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imgError ? fallbackImage : (event.imageUrl || fallbackImage)}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImgError(true)}
        />

        <div className="absolute top-3 left-3">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(event.status)}`}>
            {event.status}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="bg-white/90 text-gray-700 text-xs px-2 py-1 rounded-md font-medium">
            {event.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {event.shortDescription}
          </p>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 flex-shrink-0" />
            <span>{event.availableTickets}/{event.totalTickets} available</span>
          </div>

          <div className="flex items-center gap-2 text-purple-700 font-semibold">
            <DollarSign className="w-4 h-4 flex-shrink-0" />
            <span>{formatPrice(event.price)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/events/${event.id}`} className="flex-1">
            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg py-2 px-3 font-medium transition-colors">
              <Eye className="w-4 h-4" />
              View
            </button>
          </Link>

          <button
            onClick={() => onEdit(event)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm rounded-lg py-2 px-3 font-medium transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>

          <button
            onClick={() => onDelete(event)}
            className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 text-sm rounded-lg py-2 px-3 font-medium transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}