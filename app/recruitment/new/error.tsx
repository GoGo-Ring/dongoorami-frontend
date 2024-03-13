'use client';

import { useEffect } from 'react';

import { Button } from '~/components/button';
const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center gap-8">
      <h2>에러가 발생했습니다.</h2>
      <Button onClick={() => reset()}>재시도</Button>
    </div>
  );
};

export default Error;
