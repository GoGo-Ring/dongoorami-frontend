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
