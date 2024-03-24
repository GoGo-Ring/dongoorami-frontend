'use client';

import { MouseEvent, useCallback, useState } from 'react';

import { Button } from '~/components/button';
import { SEARCH, SELECTION } from '~/constants/filterField';

import CheckboxSelectField from './filter-field/checkbox-select';
import InputField from './filter-field/input-field';
import RadioField from './filter-field/radio-field';
import SelectField from './filter-field/select-field';

export type OptionsPartialType = string | string[] | [number, number] | number;
export interface OptionsType {
  gender: string;
  regions: string[];
  age: [number, number];
  transportation: string;
  totalCount: number;
}

interface CompanionRecruitmentFilterProps {
  onSubmit: (query: string) => void;
}

const CompanionRecruitmentFilter = ({
  onSubmit,
}: CompanionRecruitmentFilterProps) => {
  const [options, setOptions] = useState({
    gender: '무관',
    region: '',
    age: [20, 30],
    transportation: '동행',
    totalCount: 0,
    purpose: [],
  });

  const getValue = useCallback(
    (category: string, selectedOption: OptionsPartialType) => {
      setOptions(options => ({ ...options, [category]: selectedOption }));
    },
    [],
  );

  const setObject = () => {
    return {
      gender: options.gender,
      region: options.region,
      startAge: options.age[0],
      endAge: options.age[1],
      totalPeople: options.totalCount,
      purpose: options.purpose,
    };
  };

  const objectToQueryString = (object: {
    [key: string]: string | number | string[];
  }) =>
    Object.entries(object)
      .reduce((acc, [key, value]) => {
        if (value === '') {
          return acc;
        }
        if (!Array.isArray(value)) {
          return [...acc, `${key}=${value}`];
        }
        const joinedValues = value.map(v => `${key}=${v}`).join('&');

        return [...acc, joinedValues];
      }, [] as string[])
      .join('&');

  const getQuery = () => {
    return objectToQueryString(setObject());
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const query = getQuery();

    onSubmit(query);
  };

  return (
    <div className="flex w-[260px] flex-col gap-3 px-3">
      <RadioField
        category={SELECTION.GENDER.category}
        options={SELECTION.GENDER.options}
        setOption={getValue}
        fieldName={'gender'}
      />
      <RadioField
        category={SELECTION.REGIONS.category}
        options={SELECTION.REGIONS.options}
        setOption={getValue}
        fieldName={'region'}
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
        fieldName={'totalCount'}
      />
      <CheckboxSelectField
        category={SELECTION.PURPOSE.category}
        options={SELECTION.PURPOSE.options}
        setOption={getValue}
        fieldName={'purpose'}
        className="flex-row gap-2"
      />
      <Button variant="outline" onClick={handleSubmit}>
        {SEARCH}
      </Button>
    </div>
  );
};

export default CompanionRecruitmentFilter;
