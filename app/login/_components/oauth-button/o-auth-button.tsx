import Image from 'next/image';

import { Button } from '~/components/button';

import { getButtonStyle, getButtonConfig, type Domain } from './utils';

interface OAuthButtonProps {
  domain: Domain;
}

const OAuthButton = ({ domain }: OAuthButtonProps) => {
  const bgStyle = getButtonStyle(domain);
  const { icon, name } = getButtonConfig(domain);
  const alt = `${name} 로그인`;

  const linkSocialLogin = () => {
    window.location.href = `https://www.dongoorami.shop:8080/oauth2/authorization/${domain}`;
  };

  return (
    <Button
      className={`m-1 flex h-11 w-72 cursor-pointer items-center rounded-md border p-4 ${bgStyle}`}
      onClick={linkSocialLogin}
    >
      <Image width="16" height="16" src={icon} alt={alt} />
      <div className="flex w-full justify-center text-sm text-inherit">
        {name} 로그인
      </div>
    </Button>
  );
};

export default OAuthButton;
