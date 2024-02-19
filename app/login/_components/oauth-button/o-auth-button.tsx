import Image from 'next/image';

import { Button } from '~/components/button';

import {
  getButtonStyle,
  getButtonConfig,
  oAuthUrl,
  type Domain,
} from './utils';

interface OAuthButtonProps {
  domain: Domain;
}

const OAuthButton = ({ domain }: OAuthButtonProps) => {
  const bgStyle = getButtonStyle(domain);
  const { icon, name } = getButtonConfig(domain);
  const alt = `${name} 로그인`;

  const linkAccessCode = () => {
    window.location.href = oAuthUrl[domain];
  };

  return (
    <Button
      className={`m-1 flex h-11 w-72 cursor-pointer items-center rounded-md border p-4 ${bgStyle}`}
      onClick={linkAccessCode}
    >
      <Image width="16" height="16" src={icon} alt={alt} />
      <div className="flex w-full justify-center text-sm text-inherit">
        {name} 로그인
      </div>
    </Button>
  );
};

export default OAuthButton;
