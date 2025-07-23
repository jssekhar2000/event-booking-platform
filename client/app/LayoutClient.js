'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/hooks/useAuth';
import ToastProvider from '@/components/Toast';

const noHeaderRoutes = ['/login', '/register']; // adjust as needed

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const shouldShowHeader = !noHeaderRoutes.includes(pathname);

  return (
    <AuthProvider>
      <ToastProvider>
        <div className="bg-gray-100 text-gray-900 min-h-screen">
          {shouldShowHeader && <Header />}
          <main>{children}</main>
          {shouldShowHeader && <Footer />}
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}
