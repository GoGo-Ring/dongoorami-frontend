'use client';

import { MouseEvent, useRef } from 'react';

import { Button } from '~/components/button';
import { SEARCH, SELECTION } from '~/constants/filterField';

import CheckboxSelectField from './filter-field/checkbox-select';
import InputField from './filter-field/input-field';
import RadioField from './filter-field/radio-field';
import SelectField from './filter-field/select-field';

export interface refType {
  gender: string;
  region: string[];
  age: number[];
  transportation: string;
  personCount: number;
}

interface CompanionRecruitmentFilterProps {
  onSubmit: (query: string) => void;
}
const CompanionRecruitmentFilter = ({
  onSubmit,
}: CompanionRecruitmentFilterProps) => {
  const radioRef = useRef<string>(SELECTION.GENDER.options[0].value);
  const checkbox = SELECTION.REGIONS.options.reduce(
    (acc, option) => {
      acc[option] = false;

      return acc;
    },
    {} as Record<string, boolean>,
  );
  const checkboxRef = useRef(checkbox);
  const transportationRef = useRef<string>(
    SELECTION.TRANSPORTATION.options[0].value,
  );
  const ageRef = useRef([20, 30]);
  const personCountRef = useRef(1);

  const joinQuery = (...targets: string[][]) => {
    return targets.map(target => target.join('&'));
  };

  const setObject = (regionQuery: string) => {
    return {
      gender: radioRef.current,
      regions: regionQuery,
      transportation: transportationRef.current,
      startAge: ageRef.current[0],
      endAge: ageRef.current[1],
      totalPeople: personCountRef.current,
    };
  };

  const getQuery = () => {
    const [regionQuery] = joinQuery(
      Object.keys(checkboxRef.current).filter(key => checkboxRef.current[key]),
    );

    const { gender, regions, startAge, endAge, transportation, totalPeople } =
      setObject(regionQuery);

    return `gender=${gender}&region=${regions}&startAge=${startAge}&endAge=${endAge}&transportation=${transportation}&totalPeople=${totalPeople}`;
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
      <Button variant="outline" onClick={handleSubmit}>
        {SEARCH}
      </Button>
    </div>
  );
};

export default CompanionRecruitmentFilter;