import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import Icon from '~/components/icon';
import { cn } from '~/libs/utils';
import { calculateStarRating } from '~/utils/starRating';

interface InputRatingProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  starCount?: number;
  id?: string;
}
const InputRating = ({ onChange, starCount = 5, id }: InputRatingProps) => {
  return (
    <input
      id={id}
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
  id?: string;
}

const StarRating = ({ starCount = 5, rate, setRate, id }: StarRatingProps) => {
  const star = calculateStarRating({ starCount, rate });

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
        {setRate && (
          <InputRating onChange={onChange} id={id} starCount={starCount} />
        )}
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
