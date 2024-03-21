import React, {
  memo,
  useState,
  useRef,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';

import { Button } from '~/components/button';
import { Checkbox } from '~/components/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/collapsible';
import Icon from '~/components/icon';
import { Textarea } from '~/components/textarea';
import { cn } from '~/libs/utils';

import { RATING_ITEMS } from './constants';
import StarRating from './star-rating';

export interface RatingItem {
  '시간 약속을 잘 지켜요.': boolean;
  '응답이 빨라요.': boolean;
  '친절하고 매너가 좋아요.': boolean;
  '정산이 확실해요.': boolean;
  [key: string]: boolean;
}

export interface ReviewType {
  userId: number;
  starRating: number;
  text: string;
  isChecked: RatingItem;
}

type OnUpdateType = ({ userId, text, starRating }: ReviewType) => void;

interface ReviewFormProps {
  username: string;
  userId: number;
  onUpdate: OnUpdateType;
}

const ReviewForm = ({ username, userId, onUpdate }: ReviewFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rate, setRate] = useState(0);
  const ref = useRef<HTMLTextAreaElement>(null);
  const [isChecked, setIsChecked] = useState<RatingItem>(
    RATING_ITEMS.reduce((acc, cur) => {
      return { ...acc, [cur]: false };
    }, {} as RatingItem),
  );

  const onChange = useCallback(
    (callbackFn: OnUpdateType) => {
      if (!ref.current) {
        return;
      }
      const { value } = ref.current;

      callbackFn({
        userId,
        text: value,
        starRating: rate,
        isChecked,
      });
    },
    [rate, userId, isChecked],
  );

  const handleCheckbox = (e: ChangeEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;

    const [_id] = id.split('-');

    setIsChecked({ ...isChecked, [_id]: !isChecked[_id] });
  };

  const handleTextareaBlur = () => {
    onChange(onUpdate);
  };

  useEffect(() => {
    onChange(onUpdate);
  }, [onChange, onUpdate, isChecked]);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[350px] space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 pl-4">
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
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-start gap-2">
            {RATING_ITEMS.map(label => (
              <div
                id={`${label}-${userId}`}
                className="flex w-fit items-center space-x-2"
                key={label}
                onChange={handleCheckbox}
              >
                <Checkbox id={`${label}-${userId}-checkbox`} />
                <label
                  htmlFor={`${label}_${username}`}
                  id={`${label}-${userId}-label`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Textarea
          ref={ref}
          onBlur={handleTextareaBlur}
          className="resize-none"
          placeholder="동행자, 동행 상황에 대한 솔직한 리뷰를 남겨주세요."
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default memo(ReviewForm);
