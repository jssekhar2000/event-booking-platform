'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorList = [];

    if (!form.email) errorList.push('Email is required');
    if (!form.password) errorList.push('Password is required');

    if (errorList.length > 0) {
      setErrors(errorList);
      return;
    }

    try {
      const res = await axios.post('/auth/login', {
        email: form.email,
        password: form.password,
      });

      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);

      if (user.role === 'VENDOR') router.push('/vendor');
      else if (user.role === 'ADMIN') router.push('/admin');
      else router.push('/user/bookings');
    } catch (err) {
      setErrors([err.response?.data?.message || 'Login failed']);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Back to Home */}
        <div className="mb-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-purple-600 flex items-center space-x-1">
            <span>&larr;</span>
            <span>Back to Home</span>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Welcome back</h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Sign in to your EventHub account
        </p>

        {/* Error Box */}
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 pr-10 placeholder-gray-400"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <Link href="/forgot-password" className="text-xs text-purple-600 mt-1 inline-block hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition"
          >
            Sign in
          </button>
        </form>

        {/* Quick demo access - optional */}
        <div className="mt-6 text-center space-x-2">
          <button
            onClick={() => setForm({ email: 'user@demo.com', password: '123456' })}
            className="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
          >
            User Demo
          </button>
          <button
            onClick={() => setForm({ email: 'vendor@demo.com', password: '123456' })}
            className="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
          >
            Vendor Demo
          </button>
          <button
            onClick={() => setForm({ email: 'admin@demo.com', password: '123456' })}
            className="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
          >
            Admin Demo
          </button>
        </div>

        {/* Switch to register */}
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
