'use client';

import React from 'react';

import { Button } from '~/components/button';
import { SEARCH, SELECTION } from '~/constants/filterField';

import ButtonSelectField from './filter-field/button-select';
import CheckboxSelectField from './filter-field/checkbox-select';

const PerformanceFilter = () => {
  const checkbox = SELECTION.REGIONS.options.reduce(
    (acc, option) => {
      acc[option] = false;

      return acc;
    },
    {} as Record<string, boolean>,
  );
  const checkboxRef = useRef(checkbox);

  return (
    <div className="flex w-[260px] flex-col gap-6 px-3">
      <ButtonSelectField
        category={SELECTION.GENRE.category}
        options={SELECTION.GENRE.options}
      />
      <ButtonSelectField
        category={SELECTION.STATUS.category}
        options={SELECTION.STATUS.options}
      />
      <CheckboxSelectField
        category={SELECTION.REGIONS.category}
        options={SELECTION.REGIONS.options}
        ref={checkboxRef}
      />
      <Button variant="outline" type="submit">
        {SEARCH}
      </Button>
    </div>
  );
};

export default PerformanceFilter;
