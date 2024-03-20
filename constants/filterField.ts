export const SELECTION = {
  GENDER: {
    category: '성별',
    options: [
      { value: '무관', label: '무관' },
      { value: '남', label: '남' },
      { value: '여', label: '여' },
    ],
  },
  TRANSPORTATION: {
    category: '교통 수단',
    options: [
      { value: '동행', label: '동행' },
      { value: '미동행', label: '미동행' },
    ],
  },
  PERSON_COUNT: {
    category: '인원 수',
    options: Array.from({ length: 10 }, (_, i) => {
      return { value: i + 1, label: `${i + 1}명` };
    }),
  },
  AGE: {
    category: '나이',
    options: [20, 30],
  },
  GENRE: {
    category: '장르',
    options: ['콘서트', '클래식', '무용', '뮤지컬', '아동', '연극'],
  },
  STATUS: {
    category: '공연 상태',
    options: ['공연 예정', '공연중', '공연 종료'],
  },
  REGIONS: {
    category: '지역',
    options: [
      '수도권(경기, 인천 포함)',
      '강원도',
      '충청북도/충청남도',
      '경상북도/경상남도',
      '전라북도/전라남도',
      '제주도',
    ],
  },
  PURPOSE: {
    category: '목적',
    options: ['관람', '숙박', '이동'],
  },
};

export const SEARCH = '검색';

export const MULTIPLE_SELECTION_AVAILABLE = '(중복 선택 가능)';
