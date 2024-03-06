'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';

import { instance } from '~/apis';
import Spinner from '~/components/spinner';

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
    } else {
      alert('로그인 오류');
      router.push('/login');
    }
    instance.defaults.headers.common['Authorization'] = `${accessToken}`;
    isFirstLogin === 'true' ? router.push('/register') : router.push('/');
  });

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner />
    </div>
  );
};

const Page = () => {
  return (
    <Suspense>
      <OAuth />
    </Suspense>
  );
};

export default Page;
