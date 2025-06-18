import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Layout from '@/components/layout/Layout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MyBike - Your Premier Bicycle Destination',
  description:
    'Discover quality bicycles, expert services, and cycling accessories at MyBike. From road bikes to mountain bikes, we help riders of all levels find their perfect ride.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
