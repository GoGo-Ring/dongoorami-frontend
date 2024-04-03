'use client';

import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { PropsWithRequiredChildren } from '~/types/utils';

const routes = ['/message', '/users', '/register', '/recruitment/new'];

const AuthProvider = ({ children }: PropsWithRequiredChildren) => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const token = localStorage.getItem('accessToken');

    if (token && pathname.startsWith('/login')) {
      redirect('/');
    }

    if (!token && routes.includes(pathname)) {
      redirect('/login');
    }
  }, [pathname]);

  return <>{children}</>;
};

export default AuthProvider;
