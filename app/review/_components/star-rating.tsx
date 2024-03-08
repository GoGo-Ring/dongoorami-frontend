import { ChangeEvent, Dispatch, SetStateAction, useMemo } from 'react';

import Icon from '~/components/icon';
import { cn } from '~/libs/utils';
import { calculateStarRating } from '~/utils/starRating';

interface InputRatingProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  starCount?: number;
}
const InputRating = ({ onChange, starCount = 5 }: InputRatingProps) => {
  return (
    <input
      type="range"
      onChange={onChange}
      defaultValue={0}
      step={0.5}
      min={0}
      max={starCount}
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
  setRate?: Dispatch<SetStateAction<number>>;
}

const StarRating = ({ starCount = 5, rate, setRate }: StarRatingProps) => {
  const star = useMemo(
    () => calculateStarRating({ starCount, rate }),
    [rate, starCount],
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (!setRate) {
      return;
    }
    setRate(parseFloat(value));
  };

  return (
    <div className="relative flex w-fit flex-col">
      <div className={'flex'}>
        {setRate && <InputRating onChange={onChange} starCount={starCount} />}
        <div className={'flex'}>
          {star?.map((value, index) => (
            <div key={`star_${index}`} className="px-[2px]">
              <FilledStar filled={value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarRating;
