import Image from 'next/image';

import { buttonStyle } from '~/app/login/login-button-map';
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from '~/app/login/loginconfig';
import { Button } from '~/components/button';

interface OAuthButtonProps {
  domain: 'kakao' | 'naver' | 'X';
}

const urlMap: { [key: string]: string } = {
  kakao: KAKAO_AUTH_URL,
  naver: NAVER_AUTH_URL,
};

const OAuthButton = ({ domain }: OAuthButtonProps) => {
  const { bgcolor, icon, txtcolor, name, alt } = buttonStyle[domain];

  const buttonClass = `m-1 flex h-11 w-72 cursor-pointer items-center rounded-md border ${bgcolor} p-4 hover:${bgcolor}`;

  const textColor = `
  flex w-full justify-center text-sm text-${txtcolor}
  `;

  const linkAccessCode = () => {
    window.location.href = urlMap[domain];
  };

  return (
    <Button className={buttonClass} onClick={linkAccessCode}>
      <Image width="16" height="16" src={icon} alt={alt} />
      <div className={textColor}>{name} 로그인</div>
    </Button>
  );
};

export default OAuthButton;
