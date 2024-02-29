'use client';

import React, { MouseEvent, useRef } from 'react';

import { Button } from '~/components/button';
import { SEARCH, SELECTION } from '~/constants/filterField';

import ButtonSelectField from './filter-field/button-select';
import CheckboxSelectField from './filter-field/checkbox-select';

interface PerformanceFilterProps {
  onSubmit: (query: string) => void;
}

const PerformanceFilter = ({ onSubmit }: PerformanceFilterProps) => {
  const checkbox = SELECTION.REGIONS.options.reduce(
    (acc, option) => {
      acc[option] = false;

      return acc;
    },
    {} as Record<string, boolean>,
  );
  const checkboxRef = useRef(checkbox);
  const genreRef = useRef<string[]>([]);
  const statusRef = useRef<string[]>([]);

  const joinQuery = (...targets: string[][]) => {
    return targets.map(target => target.join('&'));
  };

  if (!genreRef || !statusRef || !checkboxRef) {
    return;
  }

  const setObject = (
    genreQuery: string,
    statusQuery: string,
    regionsQuery: string,
  ) => {
    return {
      genre: genreQuery,
      status: statusQuery,
      regions: regionsQuery,
    };
  };

  const getQuery = () => {
    const [genreQuery, statusQuery, regionsQuery] = joinQuery(
      genreRef.current,
      statusRef.current,
      Object.keys(checkboxRef.current).filter(key => checkboxRef.current[key]),
    );

    const { genre, status, regions } = setObject(
      genreQuery,
      statusQuery,
      regionsQuery,
    );

    return `genre=${genre}&status=${status}&regions=${regions}`;
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const query = getQuery();

    onSubmit(query);
  };

  return (
    <div className="flex w-[260px] flex-col gap-6 px-3">
      <ButtonSelectField
        category={SELECTION.GENRE.category}
        options={SELECTION.GENRE.options}
        ref={genreRef}
        isMultipleSelection
      />
      <ButtonSelectField
        category={SELECTION.STATUS.category}
        options={SELECTION.STATUS.options}
        isMultipleSelection
        ref={statusRef}
      />
      <CheckboxSelectField
        category={SELECTION.REGIONS.category}
        options={SELECTION.REGIONS.options}
        ref={checkboxRef}
      />
      <Button variant="outline" type="submit" onClick={handleSubmit}>
        {SEARCH}
      </Button>
    </div>
  );
};

export default PerformanceFilter;
