import { CompanionDetail, CompanionRequest } from '~/apis/scheme/accompany';
import { CompanionFormValue } from '~/app/recruitment/new/constants';

const genderMap = {
  irrelevant: '무관',
  male: '남',
  female: '여',
};

const companionFormValueToRequest = (companionFormValue: CompanionFormValue) =>
  ({
    concertName: companionFormValue.performanceName,
    title: companionFormValue.title,
    image: companionFormValue.image,
    content: companionFormValue.content,
    endDate: companionFormValue.performanceDate.split('~')[1] || '',
    endAge: Number(companionFormValue.maxAge) || 0,
    gender:
      genderMap[companionFormValue.gender as keyof typeof genderMap] || '무관',
    region: companionFormValue.region || '',
    startDate: companionFormValue.performanceDate.split('~')[0] || '',
    startAge: Number(companionFormValue.minAge) || 0,
    totalPeople: Number(companionFormValue.participantCount.slice(0, -1)) || 1,
    concertPlace: companionFormValue.performanceLocation || '',
  }) as CompanionRequest;

const genderMapReverse = {
  무관: 'irrelevant',
  남: 'male',
  여: 'female',
};

const companionDetailToFormValue = (companionDetail: CompanionDetail) =>
  ({
    performanceName: companionDetail.concertName,
    title: companionDetail.title,
    image: companionDetail.image,
    content: companionDetail.content,
    performanceDate: `${companionDetail.startDate}~${companionDetail.endDate}`,
    maxAge: companionDetail.endAge.toString(),
    minAge: companionDetail.startAge.toString(),
    age: `${companionDetail.startAge}~${companionDetail.endAge}`,
    gender:
      genderMapReverse[companionDetail.gender as keyof typeof genderMapReverse],
    region: companionDetail.region,
    participantCount: `${companionDetail.totalPeople}명`,
    performanceLocation: companionDetail.concertPlace,
  }) as CompanionFormValue;

export { companionFormValueToRequest, companionDetailToFormValue };
