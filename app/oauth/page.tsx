'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const OAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const isFirstLogin = searchParams.get('isFirstLogin');

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    isFirstLogin === 'true' ? router.push('/register') : router.push('/');
  });
};

export default OAuth;
