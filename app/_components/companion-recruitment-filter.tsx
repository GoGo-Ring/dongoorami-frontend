'use client';

import { useRef } from 'react';

import { Button } from '~/components/button';
import { SEARCH, SELECTION } from '~/constants/filterField';

import CheckboxSelectField from './filter-field/checkbox-select';
import InputField from './filter-field/input-field';
import RadioField from './filter-field/radio-field';
import SelectField from './filter-field/select-field';

export interface refType {
  gender: string;
  region: string[];
  age: [number, number];
  transportation: string;
  personCount: number;
}

const CompanionRecruitmentFilter = () => {
  const radioRef = useRef<string>(SELECTION.GENDER.options[0].value);
  const checkbox = SELECTION.REGIONS.options.reduce(
    (regions, option) => {
      regions[option] = false;

      return regions;
    },
    {} as Record<string, boolean>,
  );
  const checkboxRef = useRef(checkbox);
  const transportationRef = useRef<string>(
    SELECTION.TRANSPORTATION.options[0].value,
  );
  const ageRef = useRef([20, 30]);
  const personCountRef = useRef(1);

  const handle = () => {};

  return (
    <div className="flex w-[260px] flex-col gap-6 px-3">
      <RadioField
        category={SELECTION.GENDER.category}
        options={SELECTION.GENDER.options}
        ref={radioRef}
      />
      <CheckboxSelectField
        category={SELECTION.REGIONS.category}
        options={SELECTION.REGIONS.options}
        ref={checkboxRef}
      />
      <RadioField
        category={SELECTION.TRANSPORTATION.category}
        options={SELECTION.TRANSPORTATION.options}
        ref={transportationRef}
      />
      <InputField
        category={SELECTION.AGE.category}
        defaultValues={SELECTION.AGE.options}
        ref={ageRef}
      />
      <SelectField
        category={SELECTION.PERSON_COUNT.category}
        options={SELECTION.PERSON_COUNT.options}
        defaultValue={SELECTION.PERSON_COUNT.options[0].value}
        placeholder={SELECTION.PERSON_COUNT.options[0].label}
        ref={personCountRef}
      />
      <Button variant="outline" onClick={handle}>
        {SEARCH}
      </Button>
    </div>
  );
};

export default CompanionRecruitmentFilter;
