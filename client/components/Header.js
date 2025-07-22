'use client';

import Link from 'next/link';
import { Calendar, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo & Title */}
        <Link href="/" className="flex items-center space-x-2">
          <Calendar className="h-8 w-8 text-purple-600" />
          <span className="text-xl font-bold text-gray-800">EventHub</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 ml-10">
          <Link href="/" className="text-gray-700 hover:text-purple-600 font-medium">Home</Link>
          <Link href="/events" className="text-gray-700 hover:text-purple-600 font-medium">Search Events</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="text-gray-700 hover:text-purple-600 font-medium">Log In</Link>
          <Link
            href="/register"
            className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(true)} aria-label="Open Menu">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40" onClick={() => setMenuOpen(false)}>
          <div
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col space-y-4"
            onClick={(e) => e.stopPropagation()} // prevent closing on inner click
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-gray-800">Menu</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close Menu">
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            <Link href="/" className="text-purple-700 font-semibold">Home</Link>
            <Link href="/events" className="text-gray-700">Search Events</Link>
            <hr />
            <Link href="/login" className="text-gray-700">Log In</Link>
            <Link
              href="/register"
              className="bg-purple-600 text-white text-center py-2 rounded-md hover:bg-purple-700 font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
