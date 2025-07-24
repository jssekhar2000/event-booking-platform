'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import VendorEventCard from './VendorEventCard';
import DeleteEventModal from './DeleteEventModal';
import axios from '@/lib/axios';
import { useToast } from './Toast';
import Link from 'next/link';
import { useDebounce } from '../hooks/useDebounce';

export default function MyEventsSection() {
  const { showToast } = useToast();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, event: null });

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    fetchEvents(true);
  }, [debouncedSearchTerm, statusFilter]);

  const fetchEvents = async (reset = false) => {
    try {
      if (reset) {
        setLoading(true);
        setPagination(prev => ({ ...prev, currentPage: 1 }));
      } else {
        setLoadingMore(true);
      }

      const params = {
        page: reset ? 1 : pagination.currentPage + 1,
        limit: 6,
        ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
        ...(statusFilter && { status: statusFilter })
      };

      const response = await axios.get('/vendor/events', { params });
      const { events: newEvents = [], currentPage, totalPages, total } = response.data;
      if (reset) {
        setEvents(newEvents || []);
      } else {
        setEvents(prev => [...prev, ...(newEvents || [])]);
      }

      setPagination({
        currentPage: currentPage || 1,
        totalPages: totalPages || 1,
        total: total || 0
      });
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to fetch events', 'error');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleDelete = (event) => {
    setDeleteModal({ isOpen: true, event });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/vendor/events/${deleteModal.event.id}`);
      setEvents(prev => prev.filter(event => event.id !== deleteModal.event.id));
      setPagination(prev => ({ ...prev, total: Math.max(0, prev.total - 1) }));
      setDeleteModal({ isOpen: false, event: null });
      window.location.reload()
      showToast('Event deleted successfully', 'success');
    } catch (error) {
      showToast('Failed to delete event', 'error');
    }
  };

  const handleLoadMore = () => {
    if (pagination.currentPage < pagination.totalPages && !loadingMore) {
      fetchEvents(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  if (loading) {
    return (
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Events</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Events</h2>

        <Link href="/add-event">
          <button
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white min-w-[140px]"
          >
            <option value="">All Status</option>
            <option value="APPROVED">Approved</option>
            <option value="PENDING">Pending</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {(events || []).length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {pagination.total === 0 && !searchTerm && !statusFilter ? 'No events yet' : 'No events found'}
          </h3>
          <p className="text-gray-600 mb-4">
            {pagination.total === 0 && !searchTerm && !statusFilter
              ? 'Create your first event to get started'
              : 'Try adjusting your search or filters'
            }
          </p>
          {pagination.total === 0 && !searchTerm && !statusFilter && (
            <button
              onClick={() => window.location.href = '/vendor/events/create'}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Event
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(events || []).map(event => (
              <VendorEventCard
                key={event.id}
                event={event}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {pagination.currentPage < pagination.totalPages && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="bg-white hover:bg-gray-50 text-purple-600 border border-purple-600 px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loadingMore ? (
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

          {pagination.total > 0 && (
            <div className="text-center mt-4 text-sm text-gray-500">
              Showing {(events || []).length} of {pagination.total} events
            </div>
          )}
        </>
      )}

      <DeleteEventModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, event: null })}
        onConfirm={confirmDelete}
        eventTitle={deleteModal.event?.title}
      />
    </div>
  );
}