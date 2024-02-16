import Image from 'next/image';

import { ButtonStyle } from '../../app/login/login-button-map';
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from '../../app/login/loginconfig';
import { Button } from '../button';

interface OAuthButtonProps {
  domain: string;
}

const urlMap: { [key: string]: string } = {
  KAKAO_AUTH_URL: KAKAO_AUTH_URL,
  NAVER_AUTH_URL: NAVER_AUTH_URL,
};

const OAuthButton = ({ domain }: OAuthButtonProps) => {
  const { bgcolor, icon, txtcolor, name } = ButtonStyle[domain];

  const buttonStyle = `m-1 flex h-11 w-72 cursor-pointer items-center rounded-md border ${bgcolor} p-4 hover:${bgcolor}`;

  const textColor = `
  flex w-full justify-center text-sm text-${txtcolor}
  `;

  const linkAccessCode = () => {
    const upperName = domain.toUpperCase();

    const authUrl = `${upperName}_AUTH_URL`;

    window.location.href = urlMap[authUrl];
  };

  return (
    <Button className={buttonStyle} onClick={linkAccessCode}>
      <Image width="16" height="16" src={icon} alt="X 로그인" />
      <div className={textColor}>{name} 로그인</div>
    </Button>
  );
};

export default OAuthButton;
