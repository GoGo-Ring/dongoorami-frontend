export interface PerformanceInfoCard {
  id: string;
  posterSrc: string;
  title: string;
  facilityName: string;
  startDate: Date;
  status: '공연 예정' | '공연 중' | '공연 종료';
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
