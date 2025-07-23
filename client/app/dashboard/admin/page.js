'use client';

import DashboardCard from '@/components/DashboardCard';
import DashboardHeader from '@/components/DashboardHeader';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <DashboardHeader role="Admin" email={user?.email} />

      <div className="grid md:grid-cols-3 gap-4">
        <DashboardCard title="Total Users" subtitle="1,245" bg="bg-indigo-50" />
        <DashboardCard title="Total Events" subtitle="128 active" bg="bg-green-50" />
        <DashboardCard title="Pending Approvals" subtitle="5 events" bg="bg-red-50" />
      </div>

      <div className="text-center mt-6">
        <Link href="/" className="text-sm text-purple-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}