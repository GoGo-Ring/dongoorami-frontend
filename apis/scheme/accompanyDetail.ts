interface MemberProfile {
  id: number;
  nickname: string;
  profileImage: string;
  gender: '남자' | '여자';
  age: number;
  introduction: string;
  currentMember: boolean;
}

export interface AccompanyPost {
  id: number;
  title: string;
  memberProfile: MemberProfile;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  commentCount: number;
  status: '모집 중' | '모집 완료';
  concertName: string;
  concertPlace: string;
  region: '수도권(경기, 인천 포함)' | string;
  startAge: number;
  endAge: number;
  totalPeople: number;
  gender: '남' | '여' | '무관';
  startDate: string;
  endDate: string;
  waitingCount: number;
  content: string;
  images: string[];
  isWish: boolean;
  isWriter: boolean;
  purposes: ('숙박' | '이동' | '관람')[];
}

export interface RequestAcompaniPost {
  title: string;
  concertName: string;
  concertPlace: string;
  region: '수도권(경기, 인천 포함)' | string;
  startAge: number;
  endAge: number;
  totalPeople: number;
  gender: '남' | '여' | '무관';
  startDate: string;
  endDate: string;
  content: string;
  purposes: ('숙박' | '이동' | '관람')[];
}
