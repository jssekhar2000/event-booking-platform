import { Mail, Briefcase, CalendarCheck, Users, UserRoundCog } from 'lucide-react';
import Link from 'next/link';

export default function AdminUserCard({ user }) {
  const isVendor = user.role === 'VENDOR';

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col h-full">
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {user.name}
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
            user.role === 'VENDOR' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {user.role}
          </span>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4 flex-grow">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span>{user.email}</span>
          </div>

          {isVendor && (
            <>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 flex-shrink-0" />
                <span>{user.vendorName || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 flex-shrink-0" />
                <span>{user.eventsCount} {user.eventsCount === 1 ? 'event' : 'events'} listed</span>
              </div>
            </>
          )}

          {!isVendor && (
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 flex-shrink-0" />
              <span>{user.bookingsCount} {user.bookingsCount === 1 ? 'booking' : 'bookings'} made</span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link href='#'>
            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg py-2 px-3 font-medium transition-colors">
              <UserRoundCog className="w-4 h-4" />
              View User Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}