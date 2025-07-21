import { Calendar, Mail, MapPin, Phone} from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16 text-sm text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        

        <div className="space-y-3">
          <div className="flex items-center space-x-2 font-bold text-lg text-gray-900">
            <Calendar className="text-purple-600" />
            <span>EventHub</span>
          </div>
          <p className="text-gray-600 text-sm">
            Your premier destination for discovering and booking amazing events from trusted vendors worldwide.
          </p>
          <div className="flex space-x-3 text-gray-400">
            <FaFacebookF className="w-4 h-4 hover:text-purple-600 cursor-pointer" />
            <FaTwitter className="w-4 h-4 hover:text-purple-600 cursor-pointer" />
            <FaInstagram className="w-4 h-4 hover:text-purple-600 cursor-pointer" />
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-purple-600">Browse Events</Link></li>
            <li><Link href="#" className="hover:text-purple-600">Become a Vendor</Link></li>
            <li><Link href="#" className="hover:text-purple-600">How It Works</Link></li>
            <li><Link href="#" className="hover:text-purple-600">FAQ</Link></li>
          </ul>
        </div>


        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-purple-600">Help Center</Link></li>
            <li><Link href="#" className="hover:text-purple-600">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-purple-600">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-purple-600">Privacy Policy</Link></li>
          </ul>
        </div>


        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-1" /> support@eventhub.com</li>
            <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-1" /> +1 (555) 123-4567</li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-1" /> 123 Event Street<br />San Francisco, CA 94102</li>
          </ul>
        </div>
      </div>


      <div className="border-t border-gray-200 text-center py-4 text-xs text-gray-500 flex flex-col md:flex-row justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span>© 2025 EventHub. All rights reserved.</span>
        <div className="space-x-4 mt-2 md:mt-0">
          <Link href="#" className="hover:text-purple-600">Privacy</Link>
          <Link href="#" className="hover:text-purple-600">Terms</Link>
          <Link href="#" className="hover:text-purple-600">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
