import { CompanionRequest } from '~/apis/scheme/accompany';
import { CompanionFormValue } from '~/app/recruitment/new/constants';

const convertCompanionFormValueToApiRequest = (
  companionFormValue: CompanionFormValue,
): CompanionRequest => {
  const [startDate, endDate] = companionFormValue.performanceDate.split('~');
  const [startAge, endAge] = [
    companionFormValue.minAge,
    companionFormValue.maxAge,
  ];

  const gender = (() => {
    if (companionFormValue.gender === 'irrelevant') {
      return '무관';
    } else if (companionFormValue.gender === 'male') {
      return '남';
    } else if (companionFormValue.gender === 'female') {
      return '여';
    }

    return '무관';
  })();

  return {
    concertName: companionFormValue.performanceName,
    title: companionFormValue.title,
    image: companionFormValue.image,
    content: companionFormValue.content,
    endDate: endDate || '',
    endAge: Number(endAge) || 0,
    gender: gender,
    region: companionFormValue.region || '',
    startDate: startDate || '',
    startAge: Number(startAge) || 0,
    totalPeople: parseInt(companionFormValue.participantCount, 10) || 1,
  };
};

export { convertCompanionFormValueToApiRequest };
