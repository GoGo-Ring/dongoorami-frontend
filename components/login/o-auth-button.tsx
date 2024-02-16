import Image from 'next/image';

import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from './loginconfig';
import { Button } from '../button';

interface OAuthButtonProps {
  bgcolor: string;
  name: string;
  icon: string;
  txtcolor: string;
}

const NameMap: { [key: string]: string } = {
  kakao: '카카오',
  X: 'X',
  naver: '네이버',
  google: '구글',
};

const urlMap: { [key: string]: string } = {
  KAKAO_AUTH_URL: KAKAO_AUTH_URL,
  NAVER_AUTH_URL: NAVER_AUTH_URL,
};

const OAuthButton = ({ bgcolor, name, icon, txtcolor }: OAuthButtonProps) => {
  const buttonStyle = `m-1 flex h-11 w-72 cursor-pointer items-center rounded-md border ${bgcolor} p-4 hover:${bgcolor}`;

  const textColor = `
  flex w-full justify-center text-sm text-${txtcolor}
  `;

  const linkAccessCode = () => {
    const upperName = name.toUpperCase();

    const authUrl = `${upperName}_AUTH_URL`;

    window.location.href = urlMap[authUrl];
  };

  return (
    <Button className={buttonStyle} onClick={linkAccessCode}>
      <Image width="16" height="16" src={icon} alt="X 로그인" />
      <div className={textColor}>{NameMap[name]} 로그인</div>
    </Button>
  );
};

export default OAuthButton;
