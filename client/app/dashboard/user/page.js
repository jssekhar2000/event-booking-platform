'use client';

import DashboardCard from '@/components/DashboardCard';
import DashboardHeader from '@/components/DashboardHeader';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <DashboardHeader role="User" email={user?.email} />

      <div className="grid md:grid-cols-3 gap-4">
        <DashboardCard title="My Bookings" subtitle="5 upcoming events" bg="bg-indigo-50" />
        <DashboardCard title="Favorites" subtitle="12 saved events" bg="bg-green-50" />
        <DashboardCard title="Profile" subtitle="Complete" bg="bg-purple-50" />
      </div>

      <div className="text-center mt-6">
        <Link href="/" className="text-sm text-purple-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
