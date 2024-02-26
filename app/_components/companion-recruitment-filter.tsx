'use client';

import { useRef } from 'react';

import { Button } from '~/components/button';

import { SEARCH, SELECTION } from './constants';
import RadioField from './filter-field/radio-field';

export interface refType {
  gender: string;
  region: string[];
  age: number[];
  transportation: string;
  personCount: number;
}

const CompanionRecruitmentFilter = () => {
  const radioRef = useRef<string>(SELECTION.GENDER.options[0].value);

  const handle = () => {};

  return (
    <div className="flex w-[260px] flex-col gap-6 px-3">
      <RadioField
        category={SELECTION.GENDER.category}
        options={SELECTION.GENDER.options}
        ref={radioRef}
      />
      <Button variant="outline" onClick={handle}>
        {SEARCH}
      </Button>
    </div>
  );
};

export default CompanionRecruitmentFilter;
