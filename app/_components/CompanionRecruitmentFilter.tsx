'use client';

import { useRef } from 'react';

import CompanionRecruitmentFilterContainer from './CompanionRecruitmentFilterContainer';
import { SELECTION } from './constants';

const CompanionRecruitmentFilter = () => {
  const ref = useRef<Record<string, string>>({
    성별: 'irrevarnt',
    '교통 수단': 'together',
    '인원 수': '1',
  });

  const setRef = (category: string, value: string) => {
    ref.current[category] = value;
  };

  return (
    <CompanionRecruitmentFilterContainer>
      <CompanionRecruitmentFilterContainer.RadioField
        category={SELECTION.GENDER.category}
        defaultValue={SELECTION.GENDER.options[0].value}
        handleState={setRef}
      >
        {SELECTION.GENDER.options.map(({ label, value }) => (
          <CompanionRecruitmentFilterContainer.RadioItem
            key={label}
            label={label}
            value={value}
          />
        ))}
      </CompanionRecruitmentFilterContainer.RadioField>
      <CompanionRecruitmentFilterContainer.InputField category={'나이'}>
        <CompanionRecruitmentFilterContainer.InputItem />
        <CompanionRecruitmentFilterContainer.InputItem />
      </CompanionRecruitmentFilterContainer.InputField>
      <CompanionRecruitmentFilterContainer.RadioField
        category={SELECTION.TRANSPORTATION.category}
        defaultValue={SELECTION.TRANSPORTATION.options[0].value}
        handleState={setRef}
      >
        {SELECTION.TRANSPORTATION.options.map(({ label, value }) => (
          <CompanionRecruitmentFilterContainer.RadioItem
            key={label}
            label={label}
            value={value}
          />
        ))}
      </CompanionRecruitmentFilterContainer.RadioField>
      <CompanionRecruitmentFilterContainer.SelectField
        category={SELECTION.PERSON_COUNT.category}
        defaultValue={SELECTION.PERSON_COUNT.options[0].value}
        placeholder={SELECTION.PERSON_COUNT.options[0].label}
      >
        {SELECTION.PERSON_COUNT.options.map(({ label, value }) => (
          <CompanionRecruitmentFilterContainer.SelectOptionItem
            key={label}
            label={label}
            value={value}
          />
        ))}
      </CompanionRecruitmentFilterContainer.SelectField>
    </CompanionRecruitmentFilterContainer>
  );
};

export default CompanionRecruitmentFilter;
