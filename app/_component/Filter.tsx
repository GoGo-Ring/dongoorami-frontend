import CompanionRecruitmentFilter from './CompanionRecruitmentFilter';
import { SELECTION } from './constants';

const Filter = () => {
  return (
    <CompanionRecruitmentFilter>
      <CompanionRecruitmentFilter.RadioField
        category={SELECTION.GENDER.category}
        defaultValue={SELECTION.GENDER.options[0].value}
      >
        {SELECTION.GENDER.options.map(({ label, value }) => (
          <CompanionRecruitmentFilter.RadioItem
            key={label}
            label={label}
            value={value}
          />
        ))}
      </CompanionRecruitmentFilter.RadioField>
      <CompanionRecruitmentFilter.InputField category={'나이'}>
        <CompanionRecruitmentFilter.InputItem />
        <CompanionRecruitmentFilter.InputItem />
      </CompanionRecruitmentFilter.InputField>
      <CompanionRecruitmentFilter.RadioField
        category={SELECTION.TRANSPORTATION.category}
        defaultValue={SELECTION.TRANSPORTATION.options[0].value}
      >
        {SELECTION.TRANSPORTATION.options.map(({ label, value }) => (
          <CompanionRecruitmentFilter.RadioItem
            key={label}
            label={label}
            value={value}
          />
        ))}
      </CompanionRecruitmentFilter.RadioField>
      <CompanionRecruitmentFilter.SelectionField
        category={SELECTION.PERSON_COUNT.category}
        defaultValue={SELECTION.PERSON_COUNT.options[0].label}
      >
        {SELECTION.PERSON_COUNT.options.map(({ label, value }) => (
          <CompanionRecruitmentFilter.SelectOptionItem
            key={label}
            label={label}
            value={value}
          />
        ))}
      </CompanionRecruitmentFilter.SelectionField>
    </CompanionRecruitmentFilter>
  );
};

export default Filter;
