import { ComponentProps } from 'react';

import { Input } from '~/components/input';
import { cn } from '~/libs/utils';

interface EditableInputProps extends ComponentProps<typeof Input> {}

const EditableInput = ({ className, ...props }: EditableInputProps) => {
  return (
    <Input
      className={cn(
        'text-foreground disabled:cursor-default disabled:border-none disabled:opacity-100',
        className,
      )}
      {...props}
    />
  );
};

export default EditableInput;
