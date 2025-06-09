import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import ThemeProviderWrapper from '@/components/ThemeProviderWrapper';

export const metadata: Metadata = {
  title: 'Medal Count Mini App - Olympic Medal Standings',
  description: 'Olympic Medal Count application showing real-time medal standings with country flags',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
} 