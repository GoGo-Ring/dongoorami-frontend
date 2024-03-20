'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

import { Button } from '~/components/button';
const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center gap-8">
      <h2>{error.message || '오류가 발생했습니다.'}</h2>
      <Button onClick={() => reset()}>재시도</Button>
    </div>
  );
};

export default Error;
