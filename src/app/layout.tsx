import { Plus_Jakarta_Sans } from 'next/font/google';

import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${jakarta.variable} antialiased`}>{children}</body>
    </html>
  );
}
