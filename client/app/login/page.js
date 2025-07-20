'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);

      switch (user.role) {
        case 'ADMIN':
          router.push('/admin/events');
          break;
        case 'VENDOR':
          router.push('/vendor');
          break;
        default:
          router.push('/user/bookings');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Login failed');
    }
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

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Welcome back</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Sign in to your EventHub account</p>

        {errorMsg && <p className="text-red-500 text-sm mb-4 text-center">{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="text-right">
            <Link href="#" className="text-sm text-purple-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6">
          <p className="text-sm text-center text-gray-500 mb-2">Quick demo access:</p>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => setEmail('user@mail.com') || setPassword('123456')}
              className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              User Demo
            </button>
            <button
              type="button"
              onClick={() => setEmail('vendor@mail.com') || setPassword('123456')}
              className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              Vendor Demo
            </button>
            <button
              type="button"
              onClick={() => setEmail('admin@mail.com') || setPassword('123456')}
              className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              Admin Demo
            </button>
          </div>
        </div>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{' '}
          <Link href="/register" className="text-purple-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
