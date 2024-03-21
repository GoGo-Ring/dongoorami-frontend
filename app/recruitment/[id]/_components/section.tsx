import { HTMLProps } from 'react';

import { cn } from '~/libs/utils';
import { PropsWithRequiredChildren } from '~/types/utils';

const Section = ({
  children,
  className,
}: PropsWithRequiredChildren<HTMLProps<HTMLDivElement>>) => {
  return (
    <div
      className={cn(
        'flex items-start gap-7 rounded-md border border-gray-200 p-6 sm:flex-wrap md:flex-wrap',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Section;
