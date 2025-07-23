'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  Heart,
  Share2,
  ExternalLink,
  ArrowLeft,
} from 'lucide-react';
import ShareModal from '@/components/ShareModal';
import EventDetailsSideBar from '@/components/EventDetailsSideBar';
import { categoryImages } from '@/lib/constants';

export default function EventPageClientWrapper({ event }) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  const fallbackImage = categoryImages[event?.category] || categoryImages.default

  console.log('Event:', event);

  const dateObj = useMemo(() => new Date(event.date), [event.date]);
  const restrictions = useMemo(() => {
    try {
      return event.restrictions ? JSON.parse(event.restrictions) : {};
    } catch {
      return {};
    }
  }, [event.restrictions]);

  const formattedDate = useMemo(() => {
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [dateObj]);

  const formattedTime = useMemo(() => {
    return dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }, [dateObj]);

  const handleLikeToggle = useCallback(() => {
    setLiked(prev => !prev);

  }, []);

  const handleShareClick = useCallback(() => {
    setShowShareModal(true);
  }, []);

  const handleBackClick = useCallback(() => {
    router.back();
  }, [router]);

  const handleCloseModal = useCallback(() => {
    setShowShareModal(false);
  }, []);


  if (!event || !event.title) {
    return <div className="text-center py-8">Event data unavailable</div>;
  }

  return (
    <>
      <div className="mb-6">
        <button 
          onClick={handleBackClick}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-lg p-2"
          aria-label="Go back to events list"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Events</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="relative">
              <img
                src={imageError ? fallbackImage : (event.image || event.imageUrl || fallbackImage)}
                alt={event.title}
                className="w-full h-80 object-cover"
                loading="eager"
                fetchPriority="high"
                onError={() => setImageError(true)}
              />
              
              <span className="absolute top-6 left-6 bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded-full">
                {event.category}
              </span>
              
              {/* {event.isFeatured && (
                <span className="absolute top-6 left-6 mt-12 bg-yellow-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Featured
                </span>
              )} */}
              
              <div className="absolute top-6 right-6 flex gap-3">
                <button
                  onClick={handleLikeToggle}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    liked 
                      ? 'bg-purple-500 focus:ring-purple-500' 
                      : 'bg-white focus:ring-gray-300'
                  }`}
                  aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      liked ? 'text-white fill-white' : 'text-gray-600'
                    }`}
                  />
                </button>
                <button
                  onClick={handleShareClick}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                  aria-label="Share event"
                >
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-8">
              <header className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {event.title}
                </h1>
                {(event.rating || event.reviewsCount) && (
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">
                        {event.rating?.toFixed(1) || '0.0'}
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm">
                      ({event.reviewsCount || 0} reviews)
                    </span>
                  </div>
                )}
              </header>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <span className="text-gray-900 font-medium block">
                      {formattedDate}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {formattedTime}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-gray-900 font-medium block">
                      {event.location}
                    </span>
                    {event.mapUrl && (
                      <a
                        href={event.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm font-medium flex items-center gap-1 mt-1 hover:text-blue-700 focus:outline-none focus:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View on Map
                      </a>
                    )}
                  </div>
                </div>
              </div>
              {event?.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div>
                <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                  {event.longDescription || event.shortDescription}
                </p>
              </div>
            </div>
          </article>

          {(event.amenities?.length > 0 || Object.keys(restrictions).length > 0) && (
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-xl mb-6">Event Details</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {event.amenities?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-4">Amenities</h3>
                    <ul className="space-y-3">
                      {event.amenities.map((amenity) => (
                        <li key={amenity} className="flex items-center gap-2 text-gray-700">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Important Information */}
                {Object.keys(restrictions).length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-4">Important Information</h3>
                    <div className="space-y-4">
                      {restrictions.age && (
                        <div>
                          <span className="font-medium text-gray-900">Age Restriction:</span>
                          <span className="text-gray-700 ml-1">{restrictions.age}</span>
                        </div>
                      )}
                      {restrictions.dressCode && (
                        <div>
                          <span className="font-medium text-gray-900">Dress Code:</span>
                          <span className="text-gray-700 ml-1">{restrictions.dressCode}</span>
                        </div>
                      )}
                      {restrictions.capacity && (
                        <div>
                          <span className="font-medium text-gray-900">Capacity:</span>
                          <span className="text-gray-700 ml-1">{restrictions.capacity}</span>
                        </div>
                      )}
                      {(event.availableTickets || event.totalTickets) && (
                        <div>
                          <span className="font-medium text-gray-900">Available Tickets:</span>
                          <span className="text-gray-700 ml-1">
                            {event.availableTickets || 0} / {event.totalTickets || 0}
                          </span>
                        </div>
                      )}
                      {event.price && (
                        <div>
                          <span className="font-medium text-gray-900">Price:</span>
                          <span className="text-gray-700 ml-1">
                            ${event.price}
                            {event.originalPrice && event.originalPrice > event.price && (
                              <span className="text-gray-500 line-through ml-2">
                                ${event.originalPrice}
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
          {event.vendor && (
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-xl mb-6">About the Organizer</h2>
              <div className="flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                  alt={`${event.vendor.vendorName} profile`}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{event.vendor.vendorName}</h3>
                  {event.vendor.description && (
                    <p className="text-gray-600 text-sm mt-1">{event.vendor.description}</p>
                  )}
                  {event.vendor.user?.email && (
                    <p className="text-gray-500 text-sm mt-2">{event.vendor.user.email}</p>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
        <aside>
          <EventDetailsSideBar event={event} />
        </aside>
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={handleCloseModal}
        event={event}
      />
    </>
  );
}