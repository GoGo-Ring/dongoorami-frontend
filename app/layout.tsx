import '~/styles/globals.css';

import Header from '~/components/header';
import { Toaster } from '~/components/toast';
import { MSWProvider } from '~/mocks/provider';

import AuthProvider from './auth';
import Providers from './providers';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className="min-h-screen w-full bg-background font-sans antialiased">
        <Providers>
          <AuthProvider>
            <MSWProvider>
              <Header />
              <section className="mx-auto min-w-page-min max-w-page-max px-lg">
                {children}
              </section>
              <Toaster richColors />
            </MSWProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
