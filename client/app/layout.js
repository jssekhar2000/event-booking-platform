import './globals.css';
import LayoutClient from './LayoutClient';

export const metadata = {
  title: 'Multi-Vendor Event Booking Platform',
  description: 'Book and manage events easily.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
