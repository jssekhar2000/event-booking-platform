'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, User } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const isActive = (path) => pathname === path;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center space-x-2">
          <Calendar className="h-7 w-7 text-purple-600" />
          <span className="text-xl font-bold text-gray-800">EventHub</span>
        </Link>

        <nav className="flex gap-6 text-sm font-medium items-center">
          <Link
            href="/"
            className={isActive('/') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}
          >
            Home
          </Link>
          <Link
            href="/search-events"
            className={isActive('/search-events') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}
          >
            Search Events
          </Link>

          {user?.role === 'VENDOR' && (
            <Link
              href="/dashboard/vendor"
              className={isActive('/dashboard/vendor') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}
            >
              Vendor Dashboard
            </Link>
          )}
          {user?.role === 'ADMIN' && (
            <Link
              href="/dashboard/admin"
              className={isActive('/dashboard/admin') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}
            >
              Admin Dashboard
            </Link>
          )}
          {user?.role === 'USER' && (
            <Link
              href="/dashboard/user"
              className={isActive('/dashboard/user') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}
            >
              My Bookings
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">{user?.name}</span>
              </div>
              <Link
                href="/profile"
                className={isActive('/profile') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={isActive('/login') ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="bg-purple-600 text-white px-4 py-1.5 rounded-md hover:bg-purple-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}