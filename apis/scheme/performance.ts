export type StatusType = '공연 예정' | '공연 중' | '공연 종료';

export interface PerformanceInfoCard {
  id: number;
  name: string;
  place: string;
  genre: string;
  startedAt: string;
  endedAt: string;
  poster: string;
  status: StatusType;
}

export interface PerformanceInfoListItemApi {
  id: number;
  name: string;
  place: string;
  genre: string;
  startedAt: string;
  endedAt: string;
  poster: string;
  status: string;
}

export interface PerformanceList {
  hasNext: boolean;
  concertGetShortResponses: PerformanceInfoListItemApi[];
}
