/* eslint-disable react/react-in-jsx-scope */
import type { Metadata } from 'next';
import "./globals.css";
import { Inter } from 'next/font/google';
import '@radix-ui/themes/styles.css';
import { Analytics } from '@vercel/analytics/next';
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '360 Healthy Zone / Landing page',
  description: 'Take your wellness path to the next level',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      style={{ scrollBehavior: 'smooth', height: '100%' }}
    >
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
