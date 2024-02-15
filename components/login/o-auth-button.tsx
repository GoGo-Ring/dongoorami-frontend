import Image from 'next/image';

import { Button } from '../button';

interface OAuthButtonProps {
  bgcolor: string;
  name: string;
  icon: string;
  txtcolor: string;
}

const OAuthButton = ({ bgcolor, name, icon, txtcolor }: OAuthButtonProps) => {
  const buttonStyle = `m-1 flex h-11 w-72 cursor-pointer items-center rounded-md border ${bgcolor} p-4 hover:${bgcolor}`;

  const textColor = `
  flex w-full justify-center text-sm text-${txtcolor}
  `;

  return (
    <Button className={buttonStyle}>
      <Image width="16" height="16" src={icon} alt="X 로그인" />
      <div className={textColor}>{name} 로그인</div>
    </Button>
  );
};

export default OAuthButton;
