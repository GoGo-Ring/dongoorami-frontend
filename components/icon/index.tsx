import { ComponentProps } from 'react';

import { cn } from '~/libs/utils';

import Icons, { IconNames } from './icons';
import { IconSize, getSize } from './utils';

interface IconProps extends ComponentProps<'svg'> {
  iconName: IconNames;
  size?: IconSize | number;
}

const Icon = ({
  iconName,
  size = 'medium',
  className,
  ...props
}: IconProps) => {
  const Component = Icons[iconName];
  const iconSize = getSize(size);

  return (
    <Component
      width={iconSize}
      height={iconSize}
      className={cn('fill-foreground', className)}
      {...props}
    />
  );
};

export default Icon;
