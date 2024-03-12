'use client';

import { Children, ReactNode } from 'react';

interface ToggleProps {
  className?: string;
  isToggled: boolean;
  onClick: () => void;
  defaultText?: string;
  toggledText?: string;
  children?: ReactNode;
}

const Toggle = ({
  className,
  isToggled,
  onClick,
  defaultText = '',
  toggledText = '',
  children,
}: ToggleProps) => {
  const childrenArray = Children.toArray(children);

  const hasText = defaultText && toggledText;

  const [open, toggled] = childrenArray;

  if (hasText) {
    return (
      <button className={className} onClick={onClick}>
        {isToggled ? <span>{toggledText}</span> : <span>{defaultText}</span>}
      </button>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {isToggled ? toggled : open}
    </button>
  );
};

export default Toggle;
