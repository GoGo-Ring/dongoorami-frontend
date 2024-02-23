import { ComponentProps } from 'react';

import { cn } from '~/libs/utils';

import Icons, { iconNames } from './icons';

interface IconProps extends ComponentProps<'svg'> {
  iconName: iconNames;
  size?: number;
}

const Icon = ({ iconName, size = 16, className, ...props }: IconProps) => {
  const Component = Icons[iconName];

  return (
    <Component
      width={size}
      height={size}
      className={cn('fill-foreground', className)}
      {...props}
    />
  );
};

export default Icon;
