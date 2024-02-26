'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

const OAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');
  const isFirstLogin = searchParams.get('isFirstLogin');

  if (accessToken && refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  isFirstLogin ? router.push('/register') : router.push('/');
};

export default OAuth;
