import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fingoals - Financial Overview',
  description: 'Financial Analytics Dashboard built with Fingoals Design Tokens',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ backgroundColor: 'var(--fg-bg-canvas)', margin: 0, fontFamily: 'var(--fg-font-family-sans)' }}>
        {children}
      </body>
    </html>
  );
}
