import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MyRewards | Account Linking',
  description: 'MyRewards Business Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='screenPage'>
        {children}
    </div>
  );
}
