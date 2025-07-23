'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from '@/lib/axios';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Star,
  Mail,
  Phone,
  Heart,
  Share2,
  ExternalLink,
} from 'lucide-react';

import EventDetailsSideBar from '@/components/EventDetailsSideBar';
import ShareModal from '@/components/ShareModal';
import Loader from '@/components/Loader';
import { categoryImages } from '@/lib/constants';

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);
        const res = await axios.get(`/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error('Failed to fetch event:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  if(loading) {
    return <Loader />
  }

  const imageUrl = categoryImages[event.category] || categoryImages.default;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Events</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="relative">
              <img
                src={imageUrl}
                alt={event.title}
                className="w-full h-80 object-cover"
              />
              <span className="absolute top-6 left-6 bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded-full">
                {event.category}
              </span>
              <div className="absolute top-6 right-6 flex gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow ${
                    liked ? 'bg-blue-600' : 'bg-white'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      liked ? 'text-white fill-white' : 'text-gray-600'
                    }`}
                  />
                </button>
                <button 
                  onClick={() => setShowShareModal(true)}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">4.9</span>
                  </div>
                  <span className="text-gray-500">({324} reviews)</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="text-gray-900 font-medium block">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {new Date(event.date).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })} - 11:00 PM
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-gray-900 font-medium block">{event.location}</span>
                    <button className="text-blue-600 text-sm font-medium flex items-center gap-1 mt-1 hover:text-blue-700">
                      <ExternalLink className="w-4 h-4" />
                      View on Map
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Music</span>
                <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Festival</span>
                <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Outdoor</span>
                <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">Multiple Stages</span>
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed text-base">{event.description}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-xl mb-6">Event Details</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-lg text-gray-900 mb-4">Amenities</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    Food & Drinks
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    Parking
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    Restrooms
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    Security
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    First Aid
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-900 mb-4">Important Information</h4>
                <div className="space-y-4">
                  <div>
                    <span className="font-medium text-gray-900">Age Restriction:</span>
                    <span className="text-gray-700 ml-1">18+</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Dress Code:</span>
                    <span className="text-gray-700 ml-1">Casual outdoor attire recommended</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Capacity:</span>
                    <span className="text-gray-700 ml-1">5000 attendees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-xl mb-6">About the Organizer</h3>
            <div className="flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="Organizer"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{event.vendor?.vendorName}</h4>
                <p className="text-gray-600 text-sm mt-1">{event.vendor?.description}</p>
                <p className="text-gray-500 text-sm mt-2">{event.vendor?.user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        <EventDetailsSideBar event={event} />
      </div>
      <ShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)} 
        event={event}
      />
    </div>
  );
}