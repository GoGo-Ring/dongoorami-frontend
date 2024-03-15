import { factory } from '~/app/recruitment/new/utils';
import { ValidateFn } from '~/hooks/useForm/types';

export const FORM_ITEMS = {
  REGIONS: [
    '수도권(경기, 인천 포함)',
    '강원도',
    '충청북도/충청남도',
    '경상북도/경상남도',
    '전라북도/전라남도',
    '제주도',
  ],
  PARTICIPANT_COUNT: Array.from({ length: 100 }, (_, i) => `${i + 1}명`),
  GENDER: [
    {
      label: '남',
      id: 'male',
    },
    {
      label: '여',
      id: 'female',
    },
    {
      label: '무관',
      id: 'irrelevant',
    },
  ] as const,
  PURPOSES: ['숙박', '이동', '관람'],
};

export interface CompanionFormValue {
  title: string;
  performanceId: string;
  performanceDate: string;
  participantCount: string;
  region: string;
  age: string;
  minAge: string;
  maxAge: string;
  gender: string;
  male: string;
  female: string;
  irrelevant: string;
  count: string;
  content: string;
  images: string[];
  purposes: string[];
}
export const INITIAL_VALUES: CompanionFormValue = {
  title: '',
  performanceId: '',
  performanceDate: '~',
  participantCount: '',
  region: '',
  age: '20~30',
  minAge: '20',
  maxAge: '30',
  gender: 'irrelevant',
  male: '',
  female: '',
  irrelevant: '',
  count: '',
  content: '',
  images: [],
  purposes: [],
};

export const VALIDATIONS = [
  factory({
    id: 'title',
    validate: value => value.length > 0,
    message: '제목을 입력해주세요',
  }),
  factory({
    id: 'performanceId',
    validate: value => value.length > 0,
    message: '공연을 선택해주세요',
  }),
  factory({
    id: 'performanceDate',
    validate: value => {
      if (value.split('~').includes('')) {
        return false;
      }
      const now = new Date();
      const todayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );
      const [startDate] = value.split('~');

      return new Date(startDate) >= todayStart;
    },
    message: '오늘 이후의 날짜를 선택해주세요 ',
  }),
  factory({
    id: 'performanceDate',
    validate: value => {
      if (value.split('~').includes('')) {
        return false;
      }
      const [startDate, endDate] = value.split('~');

      return new Date(startDate) <= new Date(endDate);
    },
    message: '시작일이 종료일보다 빨라야합니다. ',
  }),
  factory({
    id: 'participantCount',
    validate: value => value.length > 0,
    message: '인원수를 입력해주세요',
  }),
  factory({
    id: 'region',
    validate: value => value.length > 0,
    message: '지역을 선택해주세요',
  }),
  factory({
    id: 'age',
    validate: value => {
      const [minAge, maxAge] = value.split('~');

      return (
        Number(minAge) <= Number(maxAge) &&
        Number(minAge) >= 0 &&
        Number(maxAge) <= 100
      );
    },
    message: '연령은 0세 이상 100세 이하로 입력해주세요',
  }),
  factory({
    id: 'gender',
    validate: value => value.length > 0,
    message: '성별을 선택해주세요',
  }),
  factory({
    id: 'title',
    validate: value => value.length <= 20,
    message: '제목은 20자 이하로 입력해주세요',
  }),
  factory({
    id: 'content',
    validate: value => value.length <= 1000,
    message: '내용은 1000자 이하로 입력해주세요',
  }),
  factory({
    id: 'images',
    validate: value => value.length > 0,
    message: '이미지를 업로드해주세요',
  }),
  factory({
    id: 'purposes',
    validate: value => value.length > 0,
    message: '목적을 선택해주세요',
  }),
] as {
  id: keyof CompanionFormValue;
  validate: ValidateFn<
    CompanionFormValue,
    CompanionFormValue[keyof CompanionFormValue]
  >;
  message: string;
}[];
