export const SELECTION = {
  GENDER: {
    category: '성별',
    options: [
      { value: 'irrelevant', label: '무관' },
      { value: 'male', label: '남자' },
      { value: 'female', label: '여자' },
    ],
  },
  TRANSPORTATION: {
    category: '교통 수단',
    options: [
      { value: 'together', label: '동행' },
      { value: 'separate', label: '미동행' },
    ],
  },
  PERSON_COUNT: {
    category: '인원 수',
    options: Array.from({ length: 10 }, (_, i) => {
      return { value: i + 1, label: `${i + 1}명` };
    }),
  },
};

export const SEARCH = '검색';
