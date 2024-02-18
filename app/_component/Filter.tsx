'use client';

import { GENRE_SELECTION, REGIONS, STATUS_SELECTION } from '~/constants/Filter';

import PerformanceFilter from './PerformanceFilter';

const Filter = () => {
  return (
    <PerformanceFilter>
      <PerformanceFilter.ButtonField category={GENRE_SELECTION.category}>
        {GENRE_SELECTION.options.map(option => (
          <PerformanceFilter.ButtonItem key={option} label={option} />
        ))}
      </PerformanceFilter.ButtonField>
      <PerformanceFilter.ButtonField category={STATUS_SELECTION.category}>
        {STATUS_SELECTION.options.map(option => (
          <PerformanceFilter.ButtonItem key={option} label={option} />
        ))}
      </PerformanceFilter.ButtonField>
      <PerformanceFilter.CheckboxField category={REGIONS.category}>
        {REGIONS.options.map(option => (
          <PerformanceFilter.CheckboxItem key={option} label={option} />
        ))}
      </PerformanceFilter.CheckboxField>
    </PerformanceFilter>
  );
};

export default Filter;
