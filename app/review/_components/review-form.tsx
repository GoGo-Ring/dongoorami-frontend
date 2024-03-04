import { useState } from 'react';

import { Button } from '~/components/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/collapsible';
import Icon from '~/components/icon';
import { Textarea } from '~/components/textarea';
import { cn } from '~/libs/utils';

import StarRating from './star-rating';

interface ReviewFormProps {
  username: string;
}
const ReviewForm = ({ username }: ReviewFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [rate, setRate] = useState(0);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <span className="text-sm font-semibold">{username}</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <Icon
              iconName="chevron-down"
              className={cn('transition duration-500', {
                'rotate-180 transform': isOpen,
              })}
            />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="flex justify-center ">
          <StarRating rate={rate} setRate={setRate} />
        </div>
        <Textarea
          className="resize-none"
          placeholder="동행자, 동행 상황에 대한 솔직한 리뷰를 남겨주세요."
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ReviewForm;
