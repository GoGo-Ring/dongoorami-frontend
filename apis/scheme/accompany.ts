export interface Companion {
  accompanyPostId: string;
  concertName: string;
  image: string;
  name: string;
  status: '모집중' | 'OFF';
  title: string;
  updatedAt: string;
}

export interface CompanionRequest
  extends Pick<Companion, 'concertName' | 'title' | 'image' | 'status'> {
  content: string;
  endDate: string;
  endAge: number;
  gender: '남' | '여' | '무관';
  region: string;
  startDate: string;
  startAge: number;
  totalPeople: number;
}

export interface Profile {
  id: number;
  name: string;
  profileImage: string;
  gender: '남자' | '여자';
  age: number;
  introduction: string;
  currentMember: boolean;
}

export interface CompanionDetail
  extends CompanionRequest,
    Pick<Companion, 'accompanyPostId' | 'name' | 'updatedAt' | 'status'> {
  viewCount: number;
  waitingCount: number;
  concertLocation: string;
  transportation: '미동행' | '동행';
  memberInfo: Profile;
}

export type CompanionRecruitStatus = '모집 중' | '모집 종료';
export type CompanionRecruitGender = '남' | '여' | '무관';

export interface CompanionRecruitmentCard {
  id: number;
  title: string;
  writer: string;
  createdAt: string;
  updatedAt: string;
  status: CompanionRecruitStatus;
  concertName: string;
  viewCount: number;
  commentCount: number;
  gender: CompanionRecruitGender;
  totalPeople: number;
}

export interface CompanionRecruitmentCardApi {
  id: number;
  title: string;
  writer: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  concertName: string;
  viewCount: number;
  commentCount: number;
  gender: string;
  totalPeople: number;
}

export interface AccompanyPostInfoList {
  hasNext: boolean;
  accompanyPostInfos: CompanionRecruitmentCardApi[];
}

export interface PerformanceRecruitment {
  userId: string;
  date: string;
  seenCount: number;
  commentCount: number;
  title: string;
  content: string;
}
