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
