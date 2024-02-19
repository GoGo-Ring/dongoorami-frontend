import Image from 'next/image';

import { buttonStyle } from '~/app/login/_components/oauth-button/login-button-map';
import { Button } from '~/components/button';

import { domain } from './type';

interface OAuthButtonProps {
  domain: domain;
}

const oauthUrl: { [key in domain]: string } = {
  kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC__KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC__KAKAO_REDIRECT_URI}&response_type=code`,
  naver: `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NAVER_PUBLIC__KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC__NAVER_REDIRECT_URI}&response_type=code&state=STATE_STRING`,
  google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC__GOOGLE_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC__GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`,
};

const OAuthButton = ({ domain }: OAuthButtonProps) => {
  const { bgColor, icon, txtColor, name } = buttonStyle[domain];
  const alt = `${name} 로그인`;

  const linkAccessCode = () => {
    window.location.href = oauthUrl[domain];
  };

  return (
    <Button
      className={`m-1 flex h-11 w-72 cursor-pointer items-center rounded-md border ${bgColor} p-4 hover:${bgColor}`}
      onClick={linkAccessCode}
    >
      <Image width="16" height="16" src={icon} alt={alt} />
      <div
        className={`
  flex w-full justify-center text-sm text-${txtColor}
  `}
      >
        {name} 로그인
      </div>
    </Button>
  );
};

export default OAuthButton;
