'use client';

import OAuthButton from '~/app/login/_components/o-auth-button';

const Login = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex-column h-96 w-96 min-w-96 space-y-8 p-1 ">
        <h1 className="text-center text-5xl">동구라미 로고</h1>
        <div className="rounded-md border border-slate-200 p-8">
          <OAuthButton domain="kakao"></OAuthButton>
          <OAuthButton domain="naver"></OAuthButton>
        </div>
      </div>
    </div>
  );
};

export default Login;
