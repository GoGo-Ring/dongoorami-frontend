'use client';

import { Children, ReactNode, useEffect } from 'react';

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
  const { length } = childrenArray;

  useEffect(() => {
    try {
      if ((defaultText && !toggledText) || (!defaultText && toggledText)) {
        if (!defaultText) {
          throw new Error('defaultText 입력해주세요');
        } else {
          throw new Error('toggledText 입력해주세요');
        }
      }

      if (length !== 0 && hasText) {
        throw new Error('chidren과 Text중 한 종류만 입력해주세요');
      }

      if (length && length !== 2) {
        throw new Error('chidren 2개만 입력해주세요');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, [defaultText, toggledText, length, hasText]);

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
