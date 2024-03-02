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
  extends Pick<Companion, 'concertName' | 'title' | 'image'> {
  content: string;
  endDate: string;
  endAge: number;
  gender: '남' | '여' | '무관';
  region: string;
  startDate: string;
  startAge: number;
  totalPeople: number;
}

export interface CompanionDetail
  extends CompanionRequest,
    Pick<Companion, 'accompanyPostId' | 'name' | 'updatedAt'> {
  viewCount: number;
  waitingCount: number;
}

export interface CompanionRecruitmentCard {
  title: string;
  concertName: string;
  userId: string;
  gender: string;
  personCount: number;
  viewCount: number;
  commentsCount: number;
  date: Date;
  status: '모집 중' | '모집 종료';
}
