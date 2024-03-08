import { ChangeEvent, Dispatch, SetStateAction, useMemo } from 'react';

import Icon from '~/components/icon';
import { cn } from '~/libs/utils';
import { calculateStarRating } from '~/utils/starRating';

interface InputRatingProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const InputRating = ({ onChange }: InputRatingProps) => {
  return (
    <input
      type="range"
      onChange={onChange}
      defaultValue={0}
      step={0.5}
      min={0}
      max={5}
      className={'absolute h-6 w-full opacity-0'}
    />
  );
};

interface FilledStarProps {
  filled: 'half' | 'full' | 'none';
}

const FilledStar = ({ filled }: FilledStarProps) => {
  return (
    <Icon
      iconName="filled-star"
      className={cn('none', {
        full: filled === 'full',
        half: filled === 'half',
      })}
    />
  );
};

interface StarRatingProps {
  starCount?: number;
  rate: number;
  setRate: Dispatch<SetStateAction<number>>;
}

const StarRating = ({ starCount = 5, rate, setRate }: StarRatingProps) => {
  const star = useMemo(
    () => calculateStarRating({ starCount, rate }),
    [rate, starCount],
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setRate(parseFloat(value));
  };

  return (
    <div className="relative flex w-fit flex-col">
      <InputRating onChange={onChange} />
      <div className={'flex w-36 justify-end '}>
        <div className={'flex w-[132px] justify-between '}>
          {star?.map((value, index) => (
            <FilledStar key={`star_${index}`} filled={value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarRating;
