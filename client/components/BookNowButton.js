'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';

export default function BookNowButton({ eventId, api = '/bookings', user, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBooking = async () => {
    if (!user) {
      return router.push('/login');
    }

    const confirmed = window.confirm('Do you want to confirm this booking?');
    if (!confirmed) return;

    try {
      setLoading(true);
      const res = await axios.post(api, { eventId });
      if (onSuccess) onSuccess(res.data);
      alert('Booking successful!');
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Something went wrong while booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBooking}
      disabled={loading}
      className="flex-1 bg-purple-600 text-white text-sm rounded-md py-1 font-medium hover:bg-purple-700 transition disabled:opacity-50"
    >
      {loading ? 'Booking...' : 'Book Now'}
    </button>
  );
}
