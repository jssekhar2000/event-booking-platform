'use client';

import { useState, useEffect } from 'react';
import DashboardCard from '@/components/DashboardCard';
import DashboardHeader from '@/components/DashboardHeader';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import axios from '@/lib/axios';
import { useToast } from '@/components/Toast';
import AdminEventCard from '@/components/AdminEventCard';
import AdminUserCard from '@/components/AdminUserCard';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    totalRevenue: 'N/A',
    pendingApprovals: 0,
    loadingStats: true,
  });

  const [pendingEvents, setPendingEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingMoreEvents, setLoadingMoreEvents] = useState(false);
  const [eventPagination, setEventPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEvents: 0,
  });

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMoreUsers, setLoadingMoreUsers] = useState(false);
  const [userPagination, setUserPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
  });

  const [activeSection, setActiveSection] = useState('users');

  const fetchDashboardStats = async () => {
    try {
      setDashboardStats(prev => ({ ...prev, loadingStats: true }));
      const [pendingEventsRes, usersRes] = await Promise.all([
        axios.get('/admin/events'),
        axios.get('/admin/users'),
      ]);

      setDashboardStats({
        totalUsers: usersRes.data.totalUsers || 0,
        totalEvents: 1234,
        totalRevenue: '$485,930',
        pendingApprovals: pendingEventsRes.data.totalEvents || 0,
        loadingStats: false,
      });
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to load dashboard stats', 'error');
      setDashboardStats(prev => ({ ...prev, loadingStats: false }));
    }
  };

  const fetchPendingEvents = async (pageToFetch = 1, append = false) => {
    try {
      if (pageToFetch === 1 && !append) {
        setLoadingEvents(true);
      } else {
        setLoadingMoreEvents(true);
      }

      const params = { page: pageToFetch, limit: 6 };
      const response = await axios.get('/admin/events', { params });
      const { events: fetchedEvents = [], currentPage, totalPages, totalEvents } = response.data;

      if (append) {
        setPendingEvents(prev => [...prev, ...fetchedEvents]);
      } else {
        setPendingEvents(fetchedEvents);
      }

      setEventPagination({
        currentPage: currentPage || 1,
        totalPages: totalPages || 1,
        totalEvents: totalEvents || 0,
      });

    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to fetch pending events', 'error');
      setPendingEvents([]);
    } finally {
      setLoadingEvents(false);
      setLoadingMoreEvents(false);
    }
  };

  const fetchUsers = async (pageToFetch = 1, append = false) => {
    try {
      if (pageToFetch === 1 && !append) {
        setLoadingUsers(true);
      } else {
        setLoadingMoreUsers(true);
      }

      const params = { page: pageToFetch, limit: 6 };
      const response = await axios.get('/admin/users', { params });
      const { users: fetchedUsers = [], currentPage, totalPages, totalUsers } = response.data;

      if (append) {
        setUsers(prev => [...prev, ...fetchedUsers]);
      } else {
        setUsers(fetchedUsers);
      }

      setUserPagination({
        currentPage: currentPage || 1,
        totalPages: totalPages || 1,
        totalUsers: totalUsers || 0,
      });

    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to fetch users', 'error');
      setUsers([]);
    } finally {
      setLoadingUsers(false);
      setLoadingMoreUsers(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardStats();
      fetchPendingEvents(1, false);
      fetchUsers(1, false);
    }
  }, [user]);

  const handleLoadMoreEvents = () => {
    if (eventPagination.currentPage < eventPagination.totalPages && !loadingMoreEvents) {
      fetchPendingEvents(eventPagination.currentPage + 1, true);
    }
  };

  const handleLoadMoreUsers = () => {
    if (userPagination.currentPage < userPagination.totalPages && !loadingMoreUsers) {
      fetchUsers(userPagination.currentPage + 1, true);
    }
  };

  const handleEventStatusChange = async (eventId, status) => {
    try {
      await axios.put(`/admin/events/${eventId}/approve`, { status });
      showToast(`Event ${status.toLowerCase()} successfully`, 'success');

      setPendingEvents(prev => prev.filter(event => event.id !== eventId));
      setDashboardStats(prev => ({
        ...prev,
        pendingApprovals: Math.max(0, prev.pendingApprovals - 1),
      }));

      if (pendingEvents?.length === 1 && eventPagination.currentPage > 1) {
        fetchPendingEvents(eventPagination.currentPage - 1, false);
      } else if (pendingEvents?.length === 1 && eventPagination.currentPage === 1 && eventPagination.totalEvents > 1) {
        fetchPendingEvents(1, false);
      }

    } catch (err) {
      showToast(err.response?.data?.message || `Failed to ${status.toLowerCase()} event`, 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <DashboardHeader role="Admin" name={user?.name} />

        <div className="grid md:grid-cols-4 gap-4">
          <DashboardCard
            title="Total Users"
            subtitle={dashboardStats.loadingStats ? "Loading..." : dashboardStats.totalUsers}
            bg="bg-indigo-50"
          />
          <DashboardCard
            title="Active Events"
            subtitle={dashboardStats.loadingStats ? "Loading..." : `${dashboardStats.totalEvents}`}
            bg="bg-green-50"
          />
          <DashboardCard
            title="Total Revenue"
            subtitle={dashboardStats.loadingStats ? "Loading..." : dashboardStats.totalRevenue}
            bg="bg-yellow-50"
          />
          <DashboardCard
            title="Pending Reviews"
            subtitle={dashboardStats.loadingStats ? "Loading..." : `${dashboardStats.pendingApprovals} events`}
            bg="bg-red-50"
          />
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-purple-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>

      <hr className="my-10 border-gray-200" />

      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg shadow-sm bg-gray-100 p-1">
          <button
            onClick={() => setActiveSection('users')}
            className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${
              activeSection === 'users'
                ? 'bg-white text-purple-700 shadow'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Manage Users
          </button>
          <button
            onClick={() => setActiveSection('events')}
            className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${
              activeSection === 'events'
                ? 'bg-white text-purple-700 shadow'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Pending Events
          </button>
        </div>
      </div>

      {activeSection === 'users' && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Users</h2>
          {loadingUsers ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-200 rounded-xl h-40 animate-pulse"></div>
              ))}
            </div>
          ) : users?.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.672.825 8.8 8.8 0 0 1 1.454-.672m-1.454.672v-.547m0 0a9.38 9.38 0 0 0-2.672-.825c-.234 0-.466-.02-.69-.059a11.124 11.124 0 0 0 1.29-1.377L19.5 7.75m-3.75 5.25v-.547m0 0a9.38 9.38 0 0 0 2.672-.825c-.234 0-.466-.02-.69-.059a11.124 11.124 0 0 0 1.29-1.377L19.5 7.75m-3.75 5.25c.086.088.17.178.254.265M19.5 7.75l-1.5-1.5m-3.75 5.25L12 18.75V15" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">The user list is currently empty.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(userItem => (
                  <AdminUserCard key={userItem.id} user={userItem} />
                ))}
              </div>

              {userPagination.currentPage < userPagination.totalPages && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleLoadMoreUsers}
                    disabled={loadingMoreUsers}
                    className="bg-white hover:bg-gray-50 text-purple-600 border border-purple-600 px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loadingMoreUsers ? (
                      <>
                        <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                        Loading...
                      </>
                    ) : (
                      'Load More Users'
                    )}
                  </button>
                </div>
              )}
              {userPagination.totalUsers > 0 && (
                <div className="text-center mt-4 text-sm text-gray-500">
                  Showing {users?.length} of {userPagination.totalUsers} users
                </div>
              )}
            </>
          )}
        </section>
      )}

      {activeSection === 'events' && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pending Event Approvals</h2>
          {loadingEvents ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : pendingEvents?.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.133-.653-2.227-1.607-2.733L12.75 3.03a1.125 1.125 0 0 0-1.5 0L3.354 3.375C2.4 3.882 1.75 4.976 1.75 6.108V19.5A2.25 2.25 0 0 0 4 21.75h4.75m-9-6V10.5h10.5V15m-10.5 6l2.25-3 2.25 3m-4.5-6h3.75" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pending events</h3>
              <p className="text-gray-600">All events are reviewed and approved!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingEvents.map(event => (
                  <AdminEventCard key={event.id} event={event} onUpdateStatus={handleEventStatusChange} />
                ))}
              </div>

              {eventPagination.currentPage < eventPagination.totalPages && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleLoadMoreEvents}
                    disabled={loadingMoreEvents}
                    className="bg-white hover:bg-gray-50 text-purple-600 border border-purple-600 px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loadingMoreEvents ? (
                      <>
                        <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                        Loading...
                      </>
                    ) : (
                      'Load More Events'
                    )}
                  </button>
                </div>
              )}
              {eventPagination.totalEvents > 0 && (
                <div className="text-center mt-4 text-sm text-gray-500">
                  Showing {pendingEvents.length} of {eventPagination.totalEvents} pending events
                </div>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
}