import { getImage } from '~/apis/accompany';
import {
  AccompanyPost,
  RequestAcompaniPost,
} from '~/apis/scheme/accompanyDetail';
import { CompanionFormValue } from '~/app/recruitment/new/constants';
import { ValidateFn } from '~/hooks/useForm/types';

const genderMap = {
  irrelevant: '무관',
  male: '남',
  female: '여',
} as const;

const companionFormValueToRequest = (
  companionFormValue: CompanionFormValue,
): RequestAcompaniPost => ({
  concertId: Number(companionFormValue.performanceId),
  title: companionFormValue.title,
  content: companionFormValue.content,
  endDate: companionFormValue.performanceDate.split('~')[1] || '',
  endAge: Number(companionFormValue.maxAge) || 0,
  gender:
    genderMap[companionFormValue.gender as keyof typeof genderMap] || '무관',
  region: companionFormValue.region || '',
  startDate: companionFormValue.performanceDate.split('~')[0] || '',
  startAge: Number(companionFormValue.minAge) || 0,
  totalPeople: Number(companionFormValue.participantCount.slice(0, -1)) || 1,
  purposes: companionFormValue.purposes.filter(
    (purpose): purpose is '숙박' | '이동' | '관람' =>
      ['숙박', '이동', '관람'].includes(purpose),
  ),
});

const genderMapReverse = {
  무관: 'irrelevant',
  남: 'male',
  여: 'female',
};

interface PostDataToFormValue {
  datas?: AccompanyPost;
  INITIAL_VALUES: CompanionFormValue;
}

const companionDetailToFormValue = ({
  datas,
  INITIAL_VALUES,
}: PostDataToFormValue): CompanionFormValue => {
  if (!datas) {
    return INITIAL_VALUES;
  }

  return {
    performanceId: '',
    male: '',
    female: '',
    irrelevant: '',
    count: '',
    performanceName: datas.concertName,
    title: datas.title,
    images: datas.images,
    content: datas.content,
    performanceDate: `${datas.startDate}~${datas.endDate}`,
    maxAge: datas.endAge.toString(),
    minAge: datas.startAge.toString(),
    age: `${datas.startAge}~${datas.endAge}`,
    gender: genderMapReverse[datas.gender as keyof typeof genderMapReverse],
    region: datas.region,
    participantCount: `${datas.totalPeople}명`,
    purposes: datas.purposes,
  };
};

export { companionFormValueToRequest, companionDetailToFormValue };

export type GetKeysValueOf<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

interface FactoryProps<K extends Extract<keyof CompanionFormValue, string>> {
  id: K;
  validate: ValidateFn<CompanionFormValue, CompanionFormValue[K]>;
  message: string;
}

export const factory = <K extends keyof CompanionFormValue>({
  id,
  validate,
  message,
}: FactoryProps<K>) => ({
  id,
  validate,
  message,
});

export const convertURLtoFile = async (filename: string, url: string) => {
  const blob = await getImage(url);

  const ext = blob.type.split('/').pop();
  const fullName = `${filename}.${ext}`;
  const metadata = { type: blob.type };

  return new File([blob], fullName!, metadata);
};
