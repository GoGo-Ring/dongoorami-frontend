'use client';

import { Children, ReactNode, useState } from 'react';

import InfoItem, { InfoItemProps } from './info-item';

interface InfoItemWithButtonProps extends InfoItemProps {
  children: ReactNode;
}

export const InfoItemWithButton = ({
  children,
  ...props
}: InfoItemWithButtonProps) => {
  const [more, setMore] = useState(false);

  const childrenArray = Children.toArray(children);
  const [button, toggle] = childrenArray;

  return (
    <div className="relative">
      <button
        onClick={() => setMore(!more)}
        className="absolute right-0 top-1 text-gray-300 md:hidden lg:hidden"
      >
        {toggle && (more ? toggle : button)}
        {!toggle && button}
      </button>
      <InfoItem more={more} {...props} />
    </div>
  );
};
