import Navbar from '@/components/navigation/navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='screenPage'>
        <div>
            <Navbar />
        </div>
        <div>
            {children}
        </div>
    </div>
  );
}
