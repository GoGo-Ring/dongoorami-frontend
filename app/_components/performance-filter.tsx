'use client';

import React, { MouseEvent, useCallback, useState } from 'react';

import { Button } from '~/components/button';
import { SEARCH, SELECTION } from '~/constants/filterField';
import { joinQuery } from '~/utils/joinQuery';

import ButtonSelectField from './filter-field/button-select';

interface PerformanceFilterProps {
  onSubmit: (query: string) => void;
}

const PerformanceFilter = ({ onSubmit }: PerformanceFilterProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [options, setOptions] = useState({
    genre: [],
    status: [],
  });

  const setObject = (genreQuery: string, statusQuery: string) => {
    return {
      genre: genreQuery,
      status: statusQuery,
    };
  };

  const getQuery = () => {
    const { genre: optionGenre, status: optionStatus } = options;
    const [genreQuery, statusQuery] = joinQuery(optionGenre, optionStatus);

    const { genre, status } = setObject(genreQuery, statusQuery);

    return `genre=${genre}&status=${status}`;
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const query = getQuery();

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
