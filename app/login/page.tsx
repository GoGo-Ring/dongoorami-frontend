'use client';

import OAuthButton from './_components/oauth-button/o-auth-button';

const Login = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex-column h-96 w-96 min-w-96 space-y-8 p-1 ">
        <h1 className="text-shadow text-center font-title text-6xl text-primary">
          동구라미{' '}
        </h1>
        <div className="rounded-md border border-slate-200 p-8">
          <OAuthButton domain="kakao" />
          <OAuthButton domain="naver" />
          <OAuthButton domain="google" />
        </div>
      </div>
    </div>
  );
};

export default Login;
