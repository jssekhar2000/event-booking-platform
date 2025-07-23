'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileSettingsPage() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    email: user?.email || '',
    notifications: {
      email: true,
      sms: true,
      marketing: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in form.notifications) {
      setForm((prev) => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checked,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Save Profile Settings:', form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">

        <div className="mb-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-purple-600 flex items-center space-x-1">
            <span>&larr;</span>
            <span>Back to Home</span>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Profile Settings</h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Manage your account and notification preferences
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              disabled
              className="w-full mt-1 px-4 py-2 border bg-gray-100 text-gray-500 rounded-md"
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
                <label className="text-sm font-medium">First Name</label>
                <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                disabled
                className="w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 text-gray-500"
                />
            </div>
            <div className="w-1/2">
                <label className="text-sm font-medium">Last Name</label>
                <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                disabled
                className="w-full mt-1 px-4 py-2 border rounded-md bg-gray-100 text-gray-500"
                />
            </div>
            </div>

          <div>
            <label className="text-sm font-medium block mb-2">Notifications</label>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="email"
                  checked={form.notifications.email}
                  onChange={handleChange}
                />
                <span>Email notifications for new events</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="sms"
                  checked={form.notifications.sms}
                  onChange={handleChange}
                />
                <span>SMS notifications for bookings</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="marketing"
                  checked={form.notifications.marketing}
                  onChange={handleChange}
                />
                <span>Marketing emails</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
