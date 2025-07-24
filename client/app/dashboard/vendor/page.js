'use client';

import { useState, useEffect } from 'react';
import DashboardCard from '@/components/DashboardCard';
import DashboardHeader from '@/components/DashboardHeader';
import MyEventsSection from '@/components/MyEventsSection';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import axios from '@/lib/axios';

export default function VendorDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    activeEvents: 0,
    totalBookings: 0,
    totalRevenue: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setDashboardData(prev => ({ ...prev, loading: true, error: null }));
        const response = await axios.get('/vendor/dashboard');
        setDashboardData({
          activeEvents: response.data.activeEvents,
          totalBookings: response.data.totalBookings,
          totalRevenue: response.data.totalRevenue,
          loading: false,
          error: null,
        });
      } catch (err) {
        setDashboardData(prev => ({
          ...prev,
          loading: false,
          error: err.response?.data?.message || 'Failed to load dashboard data',
        }));
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (dashboardData.loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <DashboardHeader role="Vendor" name={user?.name} />
          <div className="grid md:grid-cols-3 gap-4">
            <DashboardCard title="My Events" subtitle="Loading..." bg="bg-indigo-50" />
            <DashboardCard title="Total Bookings" subtitle="Loading..." bg="bg-green-50" />
            <DashboardCard title="Revenue" subtitle="Loading..." bg="bg-purple-50" />
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

  if (dashboardData.error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <DashboardHeader role="Vendor" name={user?.name} />
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md mb-4" role="alert">
            {dashboardData.error}
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <DashboardCard title="My Events" subtitle="Error" bg="bg-indigo-50" />
            <DashboardCard title="Total Bookings" subtitle="Error" bg="bg-green-50" />
            <DashboardCard title="Revenue" subtitle="Error" bg="bg-purple-50" />
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
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <DashboardHeader role="Vendor" name={user?.name} />

        <div className="grid md:grid-cols-3 gap-4">
          <DashboardCard
            title="My Events"
            subtitle={`${dashboardData.activeEvents} active events`}
            bg="bg-indigo-50"
          />
          <DashboardCard
            title="Total Bookings"
            subtitle={`${dashboardData.totalBookings} total`}
            bg="bg-green-50"
          />
          <DashboardCard
            title="Revenue"
            subtitle={`${formatCurrency(dashboardData.totalRevenue)}`}
            bg="bg-purple-50"
          />
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