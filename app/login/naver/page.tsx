'use client';

import { useSearchParams } from 'next/navigation';

const LoginKakao = () => {
  const searchParams = useSearchParams();

  const accessCode = searchParams.get('code');

  return (
    <div>
      <div>네이버 로그인 accessCode</div>
      {/* TODO: accessCode 백에 넘겨주고 accessToken 받아오기 */}
      <div> {accessCode}</div>
    </div>
  );
};

export default LoginKakao;
