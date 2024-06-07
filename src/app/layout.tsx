import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PrimeReactProvider } from 'primereact/api';
import ToastRoot from '@/components/ToastRoot';

import './globals.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CFMM',
  description: 'The Exam is a test of Principle of Reserve Balance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrimeReactProvider>
          <ToastRoot />
          {children}
        </PrimeReactProvider>
      </body>
    </html>
  );
}
