import '~/styles/globals.css';

import { Inter as FontSans } from 'next/font/google';

import { cn } from '~/libs/utils';
import { MSWProvider } from '~/mocks/provider';

import Providers from './providers';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body
        className={cn(
          'min-h-screen w-full bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers>
          <MSWProvider>
            <section>{children}</section>
          </MSWProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
