import { HTMLProps } from 'react';

import { Button } from '~/components/button';
import { cn } from '~/libs/utils';

interface ApplyFormProps extends HTMLProps<HTMLButtonElement> {
  handleMutate: () => void;
  content: string;
  isDisabled: boolean;
}

const ApplyForm = ({
  handleMutate,
  content,
  className,
  isDisabled,
}: ApplyFormProps) => {
  return (
    <Button
      className={cn('w-fit', className)}
      onClick={handleMutate}
      disabled={isDisabled}
      type="button"
    >
      {content}
    </Button>
  );
};

export default ApplyForm;
