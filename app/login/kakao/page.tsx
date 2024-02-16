'use client';

import { useSearchParams } from 'next/navigation';

const LoginKakao = () => {
  const searchParams = useSearchParams();

  const accessCode = searchParams.get('code');

  return (
    <div>
      <div>카카오로그인중~</div>
      {/* TODO: accessCode 백에 넘겨주고 accessToken 받아오기 */}
      <div> {accessCode}</div>
    </div>
  );
};

export default LoginKakao;
