import './globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'Event Booking Platform',
  description: 'Book and manage events easily.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
