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
  status: StatusType;
}

export interface PerformanceInfoListItemApi extends Performance {
  status: string;
}

export interface PerformanceList {
  hasNext: boolean;
  concertGetShortResponses: PerformanceInfoListItemApi[];
}
