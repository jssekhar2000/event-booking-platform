import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        <Link href="/" className="flex items-center space-x-2">
          <span className="text-purple-600 text-2xl">📅</span>
          <span className="text-xl font-bold text-gray-800">EventHub</span>
        </Link>


        <nav className="hidden md:flex space-x-6 ml-10">
          <Link
            href="/"
            className="text-gray-700 hover:text-purple-600 font-medium"
          >
            Home
          </Link>
          <Link
            href="/events"
            className="text-gray-700 hover:text-purple-600 font-medium"
          >
            Search Events
          </Link>
        </nav>

  
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-gray-700 hover:text-purple-600 font-medium"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
