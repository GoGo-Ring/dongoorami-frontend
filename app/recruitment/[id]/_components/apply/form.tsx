import { HTMLProps } from 'react';

import { Button } from '~/components/button';

interface ApplyFormProps extends HTMLProps<HTMLDivElement> {
  handleMutate: () => void;
  content: string;
  isPending: boolean;
}

const ApplyForm = ({ handleMutate, content, isPending }: ApplyFormProps) => {
  return (
    <div className="flex w-full">
      <div className="w-1/2">
        <Button className="px-8" onClick={handleMutate} disabled={isPending}>
          {content}
        </Button>
      </div>
    </div>
  );
};

export default ApplyForm;
