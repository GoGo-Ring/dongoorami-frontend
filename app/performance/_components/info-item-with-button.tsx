'use client';

import { ReactNode, useState } from 'react';

import InfoItem, { InfoItemProps } from './info-item';
import Toggle from './toggle';

interface InfoItemWithButtonProps extends InfoItemProps {
  children?: ReactNode;
  defaultText?: string;
  toggledText?: string;
}

const InfoItemWithToggle = ({
  children,
  defaultText,
  toggledText,
  ...props
}: InfoItemWithButtonProps) => {
  const [more, setMore] = useState(false);

  const handleClick = () => {
    setMore(!more);
  };

  return (
    <div className="relative">
      <Toggle
        isToggled={more}
        onClick={handleClick}
        className="absolute right-0 top-1 text-gray-300 md:hidden lg:hidden"
        defaultText={defaultText}
        toggledText={toggledText}
      >
        {children}
      </Toggle>
      <InfoItem more={more} {...props} />
    </div>
  );
};

export default InfoItemWithToggle;
