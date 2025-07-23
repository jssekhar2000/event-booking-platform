'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from './Toast';

export default function BookNowButton({ eventId, fullWidth = false }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleBooking = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'USER') {
      showToast('Only Users can book events. Please login with a user account.', 'error');
      return;
    }

    const confirmed = window.confirm('Do you want to confirm this booking?');
    if (!confirmed) return;

    try {
      setLoading(true);
      console.log('Booking event:', eventId);
      const res = await axios.post('/bookings', { eventId });
      if (res.status === 201) {
        showToast('Booking confirmed!', 'success');
      }
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Booking failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBooking}
      disabled={loading}
      className={`${
        fullWidth ? 'w-full' : 'flex-1'
      } bg-purple-600 text-white text-sm rounded-md py-1 font-medium hover:bg-purple-700 transition disabled:opacity-50`}
    >
      {loading ? 'Booking...' : 'Book Now'}
    </button>
  );
}
