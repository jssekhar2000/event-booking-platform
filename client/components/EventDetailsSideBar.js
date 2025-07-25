import { MapPin, Users } from 'lucide-react';
import BookNowButton from './BookNowButton';

export default function EventDetailsSideBar({ event }) {
  const available = event.availableTickets;
  const total = event.totalTickets;
  const attendees = total - available;

  return (
    <div className="space-y-6 w-full">
      <div className="bg-white border-gray-200 rounded-xl shadow-sm p-6 text-center space-y-4">
        <div>
          <div className="flex justify-center items-center space-x-2">
            <span className="text-2xl font-bold text-purple-600">${event.price}</span>
            {event.originalPrice && (
              <span className="text-lg text-gray-400 line-through">${event.originalPrice}</span>
            )}
          </div>
          <p className="text-sm text-gray-500">per person</p>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Availability</span>
          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
            {available} spots left
          </span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Current Attendees</span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 text-gray-400" />
            {attendees}
          </span>
        </div>

        <BookNowButton eventId={event.id} fullWidth />

        <p className="text-xs text-gray-500">Free cancellation up to 24 hours before the event</p>
      </div>

      <div className="bg-white border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
        <h4 className="text-sm font-semibold">Location</h4>

        <div className="bg-gray-200 rounded-lg h-40 flex items-center justify-center">
          <MapPin className="w-6 h-6 text-gray-500" />
        </div>

        <p className="text-sm text-gray-700">{event.location || 'Event Venue'}</p>

        {event.mapUrl && (
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex border rounded-md py-1.5 text-sm font-medium hover:bg-gray-100 items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Open in Maps
          </a>
        )}
      </div>
    </div>
  );
}
