'use client';

import { useState } from 'react';
import Link from 'next/link';
import axios from '@/lib/axios';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess('');

    if (!email) {
      setErrors(['Email is required']);
      return;
    }

    try {
      const res = await axios.post('/auth/forgot-password', { email });
      setSuccess(res.data?.message || 'Reset link sent successfully');
    } catch (err) {
      setErrors([
        err.response?.data?.message || 'Something went wrong. Try again later',
      ]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          Reset Password
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        {/* Error messages */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-300 text-red-700 text-sm p-4 rounded-md space-y-1 mb-4">
            {errors.map((err, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>{err}</span>
              </div>
            ))}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-green-50 border border-green-300 text-green-700 text-sm p-4 rounded-md mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-purple-600 hover:underline">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
