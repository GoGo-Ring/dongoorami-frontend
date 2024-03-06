'use client';

import { MouseEvent, useCallback, useState } from 'react';

import { Button } from '~/components/button';
import { SEARCH, SELECTION } from '~/constants/filterField';
import { joinQuery } from '~/utils/joinQuery';

import CheckboxSelectField from './filter-field/checkbox-select';
import InputField from './filter-field/input-field';
import RadioField from './filter-field/radio-field';
import SelectField from './filter-field/select-field';

export type OptionsPartialType = string | string[] | [number, number] | number;
export interface OptionsType {
  gender: string;
  region: string[];
  age: [number, number];
  transportation: string;
  personCount: number;
}

interface CompanionRecruitmentFilterProps {
  onSubmit: (query: string) => void;
}
const CompanionRecruitmentFilter = ({
  onSubmit,
}: CompanionRecruitmentFilterProps) => {
  const [options, setOptions] = useState({
    gender: 'irrelevant',
    regions: [],
    age: [20, 30],
    transportation: '',
    personCount: 0,
  });

  const getValue = useCallback(
    (category: string, selectedOption: OptionsPartialType) => {
      setOptions(options => ({ ...options, [category]: selectedOption }));
    },
    [],
  );

  const setObject = (regionQuery: string) => {
    return {
      gender: options.gender,
      regions: regionQuery,
      transportation: options.transportation,
      startAge: options.age[0],
      endAge: options.age[1],
      totalPeople: options.personCount,
    };
  };

  const objectToQueryString = (object: { [key: string]: string | number }) =>
    Object.entries(object).reduce((acc, [key, value]) => {
      return `${acc}&${key}=${value}`;
    }, '');

  const getQuery = () => {
    const [regionQuery] = joinQuery(options.regions);

    return objectToQueryString(setObject(regionQuery));
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const query = getQuery();

    onSubmit(query);
  };

  return (
    <div className="flex w-[260px] flex-col gap-6 px-3">
      <RadioField
        category={SELECTION.GENDER.category}
        options={SELECTION.GENDER.options}
        setOption={getValue}
        fieldName={'gender'}
      />
      <CheckboxSelectField
        category={SELECTION.REGIONS.category}
        options={SELECTION.REGIONS.options}
        setOption={getValue}
        fieldName={'region'}
      />
      <RadioField
        category={SELECTION.TRANSPORTATION.category}
        options={SELECTION.TRANSPORTATION.options}
        setOption={getValue}
        fieldName={'transportation'}
      />
      <InputField
        category={SELECTION.AGE.category}
        defaultValues={SELECTION.AGE.options}
        setOption={getValue}
        fieldName={'age'}
      />
      <SelectField
        category={SELECTION.PERSON_COUNT.category}
        options={SELECTION.PERSON_COUNT.options}
        defaultValue={SELECTION.PERSON_COUNT.options[0].value}
        placeholder={SELECTION.PERSON_COUNT.options[0].label}
        setOption={getValue}
        fieldName={'personCount'}
      />
      <Button variant="outline" onClick={handleSubmit}>
        {SEARCH}
      </Button>
    </div>
  );
};

export default CompanionRecruitmentFilter;