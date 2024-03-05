'use client';

import React, { MouseEvent, useCallback, useState } from 'react';

import { Button } from '~/components/button';
import { SEARCH, SELECTION } from '~/constants/filterField';

import ButtonSelectField from './filter-field/button-select';

const PerformanceFilter = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [options, setOptions] = useState({
    genre: [],
    status: [],
  });

  const getValue = useCallback((category: string, selectedOption: string[]) => {
    setOptions(options => ({ ...options, [category]: selectedOption }));
  }, []);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex w-[260px] flex-col gap-6 px-3">
      <ButtonSelectField
        category={SELECTION.GENRE.category}
        options={SELECTION.GENRE.options}
        isMultipleSelection
        setOption={getValue}
        fieldName={'genre'}
      />
      <ButtonSelectField
        category={SELECTION.STATUS.category}
        options={SELECTION.STATUS.options}
        isMultipleSelection
        setOption={getValue}
        fieldName={'status'}
      />
      <Button variant="outline" type="submit" onClick={handleSubmit}>
        {SEARCH}
      </Button>
    </div>
  );
};

export default PerformanceFilter;
