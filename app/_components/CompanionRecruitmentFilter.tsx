'use client';

import CompanionRecruitmentFilterContainer from './CompanionRecruitmentFilterContainer';
import { SELECTION } from './constants';

const CompanionRecruitmentFilter = () => {
  return (
    <CompanionRecruitmentFilterContainer>
      <CompanionRecruitmentFilterContainer.RadioField
        category={SELECTION.GENDER.category}
        defaultValue={SELECTION.GENDER.options[0].value}
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
      >
        {SELECTION.TRANSPORTATION.options.map(({ label, value }) => (
          <CompanionRecruitmentFilterContainer.RadioItem
            key={label}
            label={label}
            value={value}
          />
        ))}
      </CompanionRecruitmentFilterContainer.RadioField>
      <CompanionRecruitmentFilterContainer.SelectionField
        category={SELECTION.PERSON_COUNT.category}
        defaultValue={SELECTION.PERSON_COUNT.options[0].label}
      >
        {SELECTION.PERSON_COUNT.options.map(({ label, value }) => (
          <CompanionRecruitmentFilterContainer.SelectOptionItem
            key={label}
            label={label}
            value={value}
          />
        ))}
      </CompanionRecruitmentFilterContainer.SelectionField>
    </CompanionRecruitmentFilterContainer>
  );
};

export default CompanionRecruitmentFilter;
