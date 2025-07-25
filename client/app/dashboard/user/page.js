'use client';

import { useState, useEffect } from 'react';
import DashboardCard from '@/components/DashboardCard';
import DashboardHeader from '@/components/DashboardHeader';
import UserBookingCard from '@/components/UserBookingCard';
import CancelBookingModal from '@/components/CancelBookingModal';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import axios from '@/lib/axios';
import { useToast } from '@/components/Toast';

export default function UserDashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [dashboardStats, setDashboardStats] = useState({
    totalBookings: 0,
    upcomingEvents: 0,
    loadingStats: true,
    errorStats: null,
  });

  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingMoreBookings, setLoadingMoreBookings] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalBookings: 0,
  });
  const [cancelModal, setCancelModal] = useState({ isOpen: false, booking: null });

  const fetchBookings = async (pageToFetch = 1, append = false) => {
    try {
      if (pageToFetch === 1 && !append) {
        setLoadingBookings(true);
        setDashboardStats(prev => ({ ...prev, loadingStats: true, errorStats: null }));
      } else {
        setLoadingMoreBookings(true);
      }

      const params = { page: pageToFetch, limit: 6 };
      const response = await axios.get('/bookings', { params });
      const { bookings: fetchedBookings = [], currentPage, totalPages, totalBookings } = response.data;

      if (append) {
        setBookings(prev => [...prev, ...fetchedBookings]);
      } else {
        setBookings(fetchedBookings);
      }

      setPagination({
        currentPage: currentPage || 1,
        totalPages: totalPages || 1,
        totalBookings: totalBookings || 0,
      });

      const upcomingCount = ([...bookings,...fetchedBookings]|| []).filter(b => {
        const eventDate = new Date(b.event.date);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return eventDate >= now;
      }).length;

      setDashboardStats({
        totalBookings: totalBookings,
        upcomingEvents: upcomingCount,
        loadingStats: false,
        errorStats: null,
      });

    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to load bookings', 'error');
      setDashboardStats(prev => ({ ...prev, loadingStats: false, errorStats: err.response?.data?.message || 'Failed to load stats' }));
      setBookings([]);
    } finally {
      setLoadingBookings(false);
      setLoadingMoreBookings(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings(1, false);
    }
  }, [user]);

  const handleLoadMoreBookings = () => {
    if (pagination.currentPage < pagination.totalPages && !loadingMoreBookings) {
      fetchBookings(pagination.currentPage + 1, true);
    }
  };

  const handleCancelBooking = (booking) => {
    setCancelModal({ isOpen: true, booking });
  };

  const confirmCancelBooking = async () => {
    if (!cancelModal.booking) return;

    const bookingToCancelId = cancelModal.booking.id;
    const isUpcoming = new Date(cancelModal.booking.event.date) >= new Date();

    try {
      await axios.post('/bookings/cancel', { bookingId: bookingToCancelId });
      setCancelModal({ isOpen: false, booking: null });
      showToast('Booking cancelled successfully', 'success');

      setBookings(prevBookings => prevBookings.filter(b => b.id !== bookingToCancelId));
      setDashboardStats(prevStats => ({
        ...prevStats,
        totalBookings: Math.max(0, prevStats.totalBookings - 1),
        upcomingEvents: isUpcoming ? Math.max(0, prevStats.upcomingEvents - 1) : prevStats.upcomingEvents,
      }));

      setPagination(prevPagination => ({
        ...prevPagination,
        totalBookings: Math.max(0, prevPagination.totalBookings - 1),
        totalPages: Math.max(1, Math.ceil(Math.max(0, prevPagination.totalBookings - 1) / 6)),
      }));

    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to cancel booking', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <DashboardHeader role="User" name={user?.name} />

        <div className="grid md:grid-cols-3 gap-4">
          <DashboardCard
            title="My Bookings"
            subtitle={dashboardStats.loadingStats ? "Loading..." : `${dashboardStats.upcomingEvents} upcoming events`}
            bg="bg-indigo-50"
          />
          <DashboardCard title="Favorites" subtitle="12 saved events" bg="bg-green-50" />
          <DashboardCard title="Profile" subtitle="Complete" bg="bg-purple-50" />
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-purple-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>

        {loadingBookings ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.133-.653-2.227-1.607-2.733L12.75 3.03a1.125 1.125 0 0 0-1.5 0L3.354 3.375C2.4 3.882 1.75 4.976 1.75 6.108V19.5A2.25 2.25 0 0 0 4 21.75h4.75m-9-6V10.5h10.5V15m-10.5 6l2.25-3 2.25 3m-4.5-6h3.75" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-4">
              It looks like you haven't booked any events. Start exploring!
            </p>
            <Link href="/events" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Explore Events
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map(booking => (
                <UserBookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} />
              ))}
            </div>

            {pagination.currentPage < pagination.totalPages && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMoreBookings}
                  disabled={loadingMoreBookings}
                  className="bg-white hover:bg-gray-50 text-purple-600 border border-purple-600 px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loadingMoreBookings ? (
                    <>
                      <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                      Loading...
                    </>
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}

            {pagination.totalBookings > 0 && (
              <div className="text-center mt-4 text-sm text-gray-500">
                Showing {bookings.length} of {pagination.totalBookings} bookings
              </div>
            )}
          </>
        ))}
      </div>

      <CancelBookingModal
        isOpen={cancelModal.isOpen}
        onClose={() => setCancelModal({ isOpen: false, booking: null })}
        onConfirm={confirmCancelBooking}
        eventTitle={cancelModal.booking?.event?.title}
      />
    </div>
  );
}