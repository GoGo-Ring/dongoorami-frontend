'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { PropsWithRequiredChildren } from '~/types/utils';

const routes = ['/message', '/register'];

const AuthProvider = ({ children }: PropsWithRequiredChildren) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const token = localStorage.getItem('accessToken');

    if (token && pathname.startsWith('/login')) {
      router.push('/');
    }

    if (!token && routes.includes(pathname)) {
      router.push('/login');
    }
  }, [pathname, router]);

  return <>{children}</>;
};

export default AuthProvider;
