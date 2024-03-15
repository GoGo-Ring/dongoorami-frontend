import PerformanceInfoCard from './performance-info-card';
import useIntersectionObsever from './useIntersectionObserver';

interface PerformanceInfoCardProps {
  posterSrc: string;
  title: string;
  facilityName: string;
  startDate: Date;
  status: '공연 예정' | '공연 중' | '공연 종료';
}

interface pagesType {
  performanceList: PerformanceInfoCardProps[];
}

export interface PerformanceInfoListType {
  data: { pages: pagesType[] };
}

export interface PerformanceInfoListProps {
  data: { pages: pagesType[] };
  isInfinite: boolean;
  handleFetchNextPage: () => void;
  hasNextPage: boolean;
}

const PerformanceInfoList = ({
  data,
  isInfinite,
  handleFetchNextPage,
  hasNextPage,
}: PerformanceInfoListProps) => {
  const [ref] = useIntersectionObsever({ handleFetchNextPage, hasNextPage });

  return (
    <>
      <div className="flex flex-col gap-6">
        <h3 className="font-semibold">공연</h3>
        <div className="mx-auto grid grid-cols-3">
          {data?.pages?.map(page =>
            page?.performanceList?.map(({ startDate, ...rest }, id) => (
              <PerformanceInfoCard
                key={id}
                startDate={new Date(startDate)}
                {...rest}
              />
            )),
          )}
          {isInfinite && <div ref={ref} />}
        </div>
      </div>
    </>
  );
};

export default PerformanceInfoList;
