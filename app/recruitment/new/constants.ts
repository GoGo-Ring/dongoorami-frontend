export const FORM_IDS = {
  TITLE: 'title',
  PERFORMANCE_NAME: 'performanceName',
  PERFORMANCE_DATE: 'performanceDate',
  PERFORMANCE_LOCATION: 'performanceLocation',
  REGION: 'region',
  AGE: 'age',
  PARTICIPANT_COUNT: 'participantCount',
  MALE: 'male',
  FEMALE: 'female',
  IRRELEVANT: 'irrelevant',
  GENDER: 'gender',
};

export const FORM_LABELS = {
  TITLE: '제목',
  PERFORMANCE_NAME: '공연명',
  PERFORMANCE_DATE: '공연일',
  PERFORMANCE_LOCATION: '공연 장소',
  REGION: '지역',
  AGE: '연령',
  PARTICIPANT_COUNT: '인원수',
  MALE: '남',
  FEMALE: '여',
  IRRELEVANT: '무관',
  GENDER: '성별',
};

export const FORM_PLACEHOLDERS = {
  TITLE: '제목을 입력해주세요',
  PERFORMANCE_NAME: '공연명을 입력해주세요',
  PERFORMANCE_LOCATION: '공연 장소를 입력해주세요',
  REGION: '선택',
  PARTICIPANT_COUNT: '선택',
  TEXTAREA: '내용을 입력해주세요',
};

export const FORM_ITEMS = {
  LOCATION: [
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
  PARTICIPANTS: Array.from({ length: 100 }, (_, i) => `${i + 1}명`),
};
