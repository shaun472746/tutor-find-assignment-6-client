import type { Metadata } from 'next';
import { Roboto, Poppins } from 'next/font/google';
import NavBar from '@/Components/global/NavigationBar';
import FooterSection from '@/Components/global/FooterSection';
import { Toaster } from 'sonner';
import Providers from '@/providers/Providers';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], // Add required font weights
  variable: '--font-roboto', // Define a CSS variable for usage
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${poppins.variable} ${roboto.variable}`}>
          <Toaster />
          <NavBar />
          {children}
          <FooterSection />
        </body>
      </html>
    </Providers>
  );
}
