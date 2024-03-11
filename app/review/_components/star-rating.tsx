import { ChangeEvent, Dispatch, SetStateAction, useMemo } from 'react';

import Icon from '~/components/icon';
import { cn } from '~/libs/utils';

interface InputRatingProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}
const InputRating = ({ onChange, id }: InputRatingProps) => {
  return (
    <input
      id={id}
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

enum StarState {
  None = 'none',
  Half = 'half',
  Full = 'full',
}

interface StarRatingProps {
  starCount?: number;
  rate: number;
  setRate: Dispatch<SetStateAction<number>>;
  id?: string;
}
const StarRating = ({ starCount = 5, rate, setRate, id }: StarRatingProps) => {
  const star = useMemo(() => {
    const defaultRating = Array.from(
      { length: starCount },
      () => StarState.None,
    );
    const hasHalf = Number.isInteger(rate);

    if (rate === 0) {
      return defaultRating;
    }

    const IntegerRate = Math.floor(rate);
    const newRating = defaultRating.map((none, index) =>
      index <= IntegerRate - 1 ? StarState.Full : none,
    );

    if (!hasHalf) {
      newRating[IntegerRate] = StarState.Half;
    }

    return newRating;
  }, [rate, starCount]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setRate(parseFloat(value));
  };

  return (
    <div className="relative flex w-fit flex-col">
      <InputRating onChange={onChange} id={id} />
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
