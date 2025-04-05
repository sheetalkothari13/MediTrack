import { Inter } from 'next/font/google';
import UserGreeting from './components/UserGreeting';
import { SessionProvider } from './context/SessionContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Medix',
  description: 'Your medical companion',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <UserGreeting />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
