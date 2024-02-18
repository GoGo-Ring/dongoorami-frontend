'use client';

import { GENRE_SELECTION } from '~/constants/Filter';

import PerformanceFilter from './PerformanceFilter';

const Filter = () => {
  return (
    <PerformanceFilter>
      <PerformanceFilter.ButtonField category={GENRE_SELECTION.category}>
        {GENRE_SELECTION.options.map(option => (
          <PerformanceFilter.ButtonItem key={option} label={option} />
        ))}
      </PerformanceFilter.ButtonField>
    </PerformanceFilter>
  );
};

export default Filter;
