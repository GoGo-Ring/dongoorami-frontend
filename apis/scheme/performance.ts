export interface PerformanceInfoCard {
  id: string;
  posterSrc: string;
  title: string;
  facilityName: string;
  startDate: Date;
  status: '공연 예정' | '공연 중' | '공연 종료';
}
