import { ChangeEvent, useMemo, useState } from 'react';

import Icon from '~/components/icon';

interface InputRatingProps {
  width?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const InputRating = ({ onChange }: InputRatingProps) => {
  return (
    <input
      type="range"
      onChange={onChange}
      step={0.5}
      min={0}
      max={5}
      className={'absolute h-6 w-36'}
    />
  );
};

interface FilledStarProps {
  filled: 'half' | 'full' | 'none';
}

const FilledStar = ({ filled }: FilledStarProps) => {
  if (filled === 'full') {
    return <Icon iconName="filled-star" className="full" />;
  }
  if (filled === 'half') {
    return <Icon iconName="filled-star" className="half" />;
  }

  return <Icon iconName="filled-star" className="none" />;
};

enum StarState {
  None = 'none',
  Half = 'half',
  Full = 'full',
}

const StarRating = () => {
  const [rate, setRate] = useState(0);
  const star = useMemo(() => {
    const rating = [
      StarState.None,
      StarState.None,
      StarState.None,
      StarState.None,
      StarState.None,
    ];

    if (rate === 0) {
      return rating;
    }

    return rating.map((_, index) => {
      if (rate === 0.5 && index === 0) {
        return StarState.Half;
      }
      if (rate === 1 && index === 0) {
        return StarState.Full;
      }
      if (rate === 1.5 && index === 1) {
        return StarState.Half;
      }
      if (rate === 2 && index === 1) {
        return StarState.Full;
      }
      if (rate === 2.5 && index === 2) {
        return StarState.Half;
      }
      if (rate === 3 && index === 2) {
        return StarState.Full;
      }
      if (rate === 3.5 && index === 3) {
        return StarState.Half;
      }
      if (rate === 4 && index === 3) {
        return StarState.Full;
      }
      if (rate === 4.5 && index === 4) {
        return StarState.Half;
      }
      if (rate === 5 && index === 4) {
        return StarState.Full;
      }
      if (index < rate) {
        return StarState.Full;
      }

      return StarState.None;
    });
  }, [rate]);
  const width = 132;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setRate(parseFloat(value));
  };

  return (
    <div className="relative flex w-fit flex-col">
      <InputRating onChange={onChange} width={width} />
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
