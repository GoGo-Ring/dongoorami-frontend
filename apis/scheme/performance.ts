export type StatusType = '공연 예정' | '공연 중' | '공연 종료';

interface Performance {
  id: number;
  name: string;
  place: string;
  genre: string;
  startedAt: string;
  endedAt: string;
  poster: string;
}
export interface PerformanceInfoCard extends Performance {
  width?: number;
  height?: number;
  status: StatusType;
}

export interface PerformanceInfoListItemApi extends Performance {
  status: string;
}

export interface PerformanceList {
  hasNext: boolean;
  concertGetShortResponses: PerformanceInfoListItemApi[];
}

export interface ConcertDetail {
  id: number;
  name: string;
  startedAt: string;
  endedAt: string;
  place: string;
  actor: string;
  crew: string;
  runtime: string;
  age: string;
  producer: string;
  agency: string;
  host: string;
  management: string;
  cost: string;
  poster: string;
  summary: string;
  genre: string;
  status: string;
  introductionImages: string[];
  schedule: string;
  totalAccompanies: number;
  totalReviews: number;
}

export interface ConcertReview {
  id: number;
  nickname: string;
  title: string;
  content: string;
  rating: number;
  isWriter: boolean;
  updatedAt: string;
}

export interface ConcertReviewList {
  hasNext: boolean;
  concertReviewGetResponses: ConcertReview[];
}

export interface PerformanceReview {
  title: string;
  content: string;
  rating: number;
}
