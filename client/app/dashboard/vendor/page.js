'use client';

import DashboardCard from '@/components/DashboardCard';
import DashboardHeader from '@/components/DashboardHeader';
import MyEventsSection from '@/components/MyEventsSection';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function VendorDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <DashboardHeader role="Vendor" email={user?.email} />

        <div className="grid md:grid-cols-3 gap-4">
          <DashboardCard title="My Events" subtitle="8 active events" bg="bg-indigo-50" />
          <DashboardCard title="Total Bookings" subtitle="342 this month" bg="bg-green-50" />
          <DashboardCard title="Revenue" subtitle="$15,420" bg="bg-purple-50" />
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-purple-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>

      <MyEventsSection />
    </div>
  );
}