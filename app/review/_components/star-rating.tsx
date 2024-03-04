import { ChangeEvent } from 'react';

interface InputRatingProps {
  width?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const InputRating = ({ onChange }: InputRatingProps) => {
  return (
    <div>
      <input
        type="range"
        onChange={onChange}
        step={0.5}
        min={0}
        max={5}
        className={'w-36'}
      />
    </div>
  );
};
const StarRating = () => {
  <InputRating onChange={onChange} width={width} />;
};

export default StarRating;
