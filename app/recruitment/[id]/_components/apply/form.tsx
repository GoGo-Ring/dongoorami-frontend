import { HTMLProps } from 'react';

import { Button } from '~/components/button';
import { cn } from '~/libs/utils';

interface ApplyFormProps extends HTMLProps<HTMLButtonElement> {
  handleMutate: () => void;
  content: string;
  isPending: boolean;
}

const ApplyForm = ({
  handleMutate,
  content,
  isPending,
  className,
}: ApplyFormProps) => {
  return (
    <Button
      className={cn('w-fit', className)}
      onClick={handleMutate}
      disabled={isPending}
      type="button"
    >
      {content}
    </Button>
  );
};

export default ApplyForm;
