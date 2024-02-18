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
    </CompanionRecruitmentFilter>
  );
};

export default Filter;
