'use client';

import { Facebook, Twitter, Instagram, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShareModal({ isOpen, onClose, event }) {
  if (!event) return null;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(event.title)}&url=${encodeURIComponent(shareUrl)}`;
  const instagramShare = '#'; // Instagram doesn't support direct sharing via URL

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-semibold mb-4">Share Event</h3>

            <div className="flex justify-between gap-4">
              <a
                href={facebookShare}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gray-100 hover:bg-gray-200 transition-colors flex flex-col items-center justify-center rounded-lg py-3"
              >
                <Facebook className="w-6 h-6 text-blue-600 mb-1" />
                <span className="text-sm font-medium text-gray-800">Facebook</span>
              </a>
              <a
                href={twitterShare}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gray-100 hover:bg-gray-200 transition-colors flex flex-col items-center justify-center rounded-lg py-3"
              >
                <Twitter className="w-6 h-6 text-sky-500 mb-1" />
                <span className="text-sm font-medium text-gray-800">Twitter</span>
              </a>
              <a
                href={instagramShare}
                className="flex-1 bg-gray-100 cursor-not-allowed opacity-60 flex flex-col items-center justify-center rounded-lg py-3"
                title="Instagram sharing not supported via link"
              >
                <Instagram className="w-6 h-6 text-pink-500 mb-1" />
                <span className="text-sm font-medium text-gray-800">Instagram</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
