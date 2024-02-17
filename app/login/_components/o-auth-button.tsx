import Image from 'next/image';

import { buttonStyle } from '~/app/login/login-button-map';
import {
  KAKAO_REST_API_KEY,
  KAKAO_REDIRECT_URI,
  NAVER_REST_API_KEY,
  NAVER_REDIRECT_URI,
} from '~/app/login/loginconfig';
import { Button } from '~/components/button';

interface OAuthButtonProps {
  domain: 'kakao' | 'naver' | 'X';
}

const oauthUrl: { [key: string]: string } = {
  kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`,
  naver: `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_REST_API_KEY}&redirect_uri=${NAVER_REDIRECT_URI}&response_type=code&state=STATE_STRING`,
};

const OAuthButton = ({ domain }: OAuthButtonProps) => {
  const { bgcolor, icon, txtcolor, name } = buttonStyle[domain];
  const alt = `${name} 로그인`;

  const buttonClass = `m-1 flex h-11 w-72 cursor-pointer items-center rounded-md border ${bgcolor} p-4 hover:${bgcolor}`;

  const textColor = `
  flex w-full justify-center text-sm text-${txtcolor}
  `;

  const linkAccessCode = () => {
    window.location.href = oauthUrl[domain];
  };

  return (
    <Button className={buttonClass} onClick={linkAccessCode}>
      <Image width="16" height="16" src={icon} alt={alt} />
      <div className={textColor}>{name} 로그인</div>
    </Button>
  );
};

export default OAuthButton;
