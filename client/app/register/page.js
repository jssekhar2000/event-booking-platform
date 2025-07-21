'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [errors, setErrors] = useState([]);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const getPasswordRules = () => ({
    length: form.password.length >= 6,
    uppercase: /[A-Z]/.test(form.password),
    lowercase: /[a-z]/.test(form.password),
    number: /[0-9]/.test(form.password),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorList = [];

    const rules = getPasswordRules();
    if (!rules.length) errorList.push('Password must be at least 6 characters');
    if (form.password !== form.confirmPassword) errorList.push('Passwords do not match');
    if (!form.agree) errorList.push('You must agree to the terms and conditions');

    if (errorList.length > 0) {
      setErrors(errorList);
      return;
    }

    try {
      const res = await axios.post('/auth/register', {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);

      router.push(user.role === 'VENDOR' ? '/vendor' : '/user/bookings');
    } catch (err) {
      setErrors([err.response?.data?.message || 'Registration failed']);
    }
  };

  const passwordRules = getPasswordRules();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">

        <div className="mb-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-purple-600 flex items-center space-x-1">
            <span>&larr;</span>
            <span>Back to Home</span>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Create Account</h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Join EventHub and start discovering amazing events
        </p>


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

          <div>
            <label className="text-sm font-medium">Account Type</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            >
              <option value="USER">Event Attendee</option>
              <option value="VENDOR">Event Organizer</option>
            </select>
          </div>


          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                placeholder="John"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              />
            </div>
            <div className="w-1/2">
              <label className="text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              />
            </div>
          </div>


          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
              className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            />
          </div>


          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                required
                placeholder="Create a password"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 pr-10 placeholder-gray-400"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={togglePassword}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>


            {passwordFocused && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Password strength:</p>
                <ul className="ml-3 space-y-0.5">
                  <li className={passwordRules.length ? 'text-green-600' : 'text-gray-400'}>
                    • At least 6 characters
                  </li>
                  <li className={passwordRules.uppercase ? 'text-green-600' : 'text-gray-400'}>
                    • Uppercase letter
                  </li>
                  <li className={passwordRules.lowercase ? 'text-green-600' : 'text-gray-400'}>
                    • Lowercase letter
                  </li>
                  <li className={passwordRules.number ? 'text-green-600' : 'text-gray-400'}>
                    • Number
                  </li>
                </ul>
              </div>
            )}
          </div>

  
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 pr-10 placeholder-gray-400"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={toggleConfirm}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>


          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="mt-1"
            />
            <label className="text-sm text-gray-600">
              I agree to the{' '}
              <Link href="#" className="text-purple-600 underline">Terms of Service</Link>{' '}
              and{' '}
              <Link href="#" className="text-purple-600 underline">Privacy Policy</Link>
            </label>
          </div>


          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
