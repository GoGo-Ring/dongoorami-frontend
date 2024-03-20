'use client';

import React, { MouseEvent, useCallback, useState } from 'react';

import { Button } from '~/components/button';
import { SEARCH, SELECTION } from '~/constants/filterField';
import { getQuery } from '~/utils/joinQuery';

import ButtonSelectField from './filter-field/button-select';

interface PerformanceFilterProps {
  onSubmit: (query: string) => void;
}

const PerformanceFilter = ({ onSubmit }: PerformanceFilterProps) => {
  const [options, setOptions] = useState({
    genres: [],
    statuses: [],
  });

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const query = getQuery(options);

    onSubmit(query);
  };

  const getValue = useCallback((category: string, selectedOption: string[]) => {
    setOptions(options => ({ ...options, [category]: selectedOption }));
  }, []);

  return (
    <div className="flex w-[260px] flex-col gap-6 px-3">
      <ButtonSelectField
        category={SELECTION.GENRE.category}
        options={SELECTION.GENRE.options}
        isMultipleSelection
        setOption={getValue}
        fieldName={'genres'}
      />
      <ButtonSelectField
        category={SELECTION.STATUS.category}
        options={SELECTION.STATUS.options}
        isMultipleSelection
        setOption={getValue}
        fieldName={'statuses'}
      />
      <Button variant="outline" type="submit" onClick={handleSubmit}>
        {SEARCH}
      </Button>
    </div>
  );
};

export default PerformanceFilter;
