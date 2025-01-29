import ConfigureAmplifyClientSide from '@/components/ConfigureAmplifyClientSide';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MyRewards Portal',
  description: 'MyRewards Business Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="container pb-6">
        <ConfigureAmplifyClientSide />
        {children}
      </body>
    </html>
  );
}
