'use client';

import { useRouter } from 'next/navigation';

import { Button } from '~/components/button';

import OAuthButton from './_components/oauth-button/o-auth-button';

const Login = () => {
  const router = useRouter();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex-column h-96 w-96 min-w-96 space-y-8 p-1 ">
        <h1 className="text-center text-5xl">동구라미 로고</h1>
        <div className="rounded-md border border-slate-200 p-8">
          <OAuthButton domain="kakao" />
          <OAuthButton domain="naver" />
          <Button
            onClick={() =>
              router.push(
                '/oauth?accessToken=token1&refreshToken=token2&isFirstLogin=true',
              )
            }
          >
            회원가입으로 가는 테스트용 버튼
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
