'use client';

import { SELECTION } from '~/constants/Filter';

import PerformanceFilter from './PerformanceFilter';

const Filter = () => {
  return (
    <PerformanceFilter>
      <PerformanceFilter.ButtonField category={SELECTION.GENRE.category}>
        {SELECTION.GENRE.options.map(option => (
          <PerformanceFilter.ButtonItem key={option} label={option} />
        ))}
      </PerformanceFilter.ButtonField>
      <PerformanceFilter.ButtonField category={SELECTION.STATUS.category}>
        {SELECTION.STATUS.options.map(option => (
          <PerformanceFilter.ButtonItem key={option} label={option} />
        ))}
      </PerformanceFilter.ButtonField>
      <PerformanceFilter.CheckboxField category={SELECTION.REGIONS.category}>
        {SELECTION.REGIONS.options.map(option => (
          <PerformanceFilter.CheckboxItem key={option} label={option} />
        ))}
      </PerformanceFilter.CheckboxField>
    </PerformanceFilter>
  );
};

export default Filter;
