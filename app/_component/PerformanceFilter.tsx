'use client';

import { Button } from '~/components/button';
import {
  GENRE_SELECTION,
  STATUS_SELECTION,
  MULTIPLE_SELECTION_AVAILABLE,
} from '~/constants/Filter';

interface SelectionFieldProps {
  category: string;
  options: string[];
}

const ButtonSelectionField = ({ category, options }: SelectionFieldProps) => {
  return (
    <div className="flex w-[240px] flex-col gap-2">
      <div className="flex items-center">
        <span className="font-semibold">{category}</span>
        <span className="text-xs text-gray-300">
          {MULTIPLE_SELECTION_AVAILABLE}
        </span>
      </div>
      <div className="flex flex-wrap gap-1">
        {options.map(option => (
          <Button
            className="h-6 rounded-full px-3 py-[6px] text-xs"
            key={option}
            variant="outline"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

const PerformanceFilter = () => {
  return (
    <form>
      <div className="flex w-[260px] flex-col gap-6">
        <ButtonSelectionField {...GENRE_SELECTION} />
        <ButtonSelectionField {...STATUS_SELECTION} />
      </div>
    </form>
  );
};

export default PerformanceFilter;
