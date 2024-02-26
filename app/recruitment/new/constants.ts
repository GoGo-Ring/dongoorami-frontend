export const FORM_ITEMS = {
  REGIONS: [
    '서울',
    '경기',
    '인천',
    '대전',
    '대구',
    '부산',
    '울산',
    '세종',
    '강원',
    '충북',
    '충남',
    '경북',
    '경남',
    '전북',
    '전남',
    '제주',
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
};

export const INITIAL_VALUES = {
  title: '',
  performanceName: '',
  performanceDate: '',
  performanceLocation: '',
  participantCount: '',
  region: '',
  age: '20~30',
  minAge: '20',
  maxAge: '30',
  gender: 'irrelevant',
  male: '',
  female: '',
  irrelevant: '',
  image: '',
  count: '',
  textArea: '',
};

export const VALIDATIONS: {
  id: keyof typeof INITIAL_VALUES;
  validate: (value: string, values: Record<string, string>) => boolean;
  message: string;
}[] = [
  {
    id: 'title',
    validate: value => value.length > 0,
    message: '제목을 입력해주세요',
  },
  {
    id: 'performanceName',
    validate: value => value.length > 0,
    message: '공연명을 입력해주세요',
  },
  {
    id: 'performanceDate',
    validate: value => value.length > 0,
    message: '공연일을 입력해주세요',
  },
  {
    id: 'performanceLocation',
    validate: value => value.length > 0,
    message: '공연 장소를 입력해주세요',
  },
  {
    id: 'participantCount',
    validate: value => value.length > 0,
    message: '인원수를 입력해주세요',
  },
  {
    id: 'region',
    validate: value => value.length > 0,
    message: '지역을 선택해주세요',
  },
  {
    id: 'age',
    validate: value => value.length > 0,
    message: '연령을 입력해주세요',
  },
  {
    id: 'age',
    validate: (value, values) => Number(values.minAge) <= Number(values.maxAge),
    message: '최소연령이 최대연령보다 큽니다',
  },
  {
    id: 'age',
    validate: (value, values) =>
      Number(values.minAge) >= 0 && Number(values.maxAge) <= 100,
    message: '연령은 0세 이상 100세 이하로 입력해주세요',
  },
  {
    id: 'gender',
    validate: value => value.length > 0,
    message: '성별을 선택해주세요',
  },
  {
    id: 'title',
    validate: value => value.length <= 20,
    message: '제목은 20자 이하로 입력해주세요',
  },
  {
    id: 'performanceLocation',
    validate: value => value.length <= 20,
    message: '공연 장소는 20자 이하로 입력해주세요',
  },
  {
    id: 'performanceName',
    validate: value => value.length <= 20,
    message: '공연명은 20자 이하로 입력해주세요',
  },
];
