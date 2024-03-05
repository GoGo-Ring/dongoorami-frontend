'use client';

import { useCallback, useState } from 'react';

import { Button } from '~/components/button';
import { SEARCH, SELECTION } from '~/constants/filterField';

import CheckboxSelectField from './filter-field/checkbox-select';
import InputField from './filter-field/input-field';
import RadioField from './filter-field/radio-field';
import SelectField from './filter-field/select-field';

export interface OptionsType {
  gender: string;
  region: string[];
  age: [number, number];
  transportation: string;
  personCount: number;
}

export type OptionsPartialType = string | string[] | [number, number] | number;

const CompanionRecruitmentFilter = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [options, setOptions] = useState({
    gender: 'irrelevant',
    region: [],
    age: [20, 30],
    transportation: '',
    personCount: 0,
  });

  const handle = () => {};

  const getValue = useCallback(() => {}, []);

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
      <Button variant="outline" onClick={handle}>
        {SEARCH}
      </Button>
    </div>
  );
};

export default CompanionRecruitmentFilter;
