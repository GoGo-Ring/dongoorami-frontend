import { PerformanceList, StatusType } from '~/apis/scheme/performance';
import useIntersectionObsever from '~/hooks/useIntersectionObserver';

import PerformanceInfoCard from './performance-info-card';

interface Data {
  pages: PerformanceList[];
}
export interface PerformanceInfoListProps {
  data: Data;
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
  const ref = useIntersectionObsever<HTMLDivElement>({
    callback: handleFetchNextPage,
    condition: hasNextPage,
  });

  return (
    <>
      <div className="flex flex-col gap-6">
        <h3 className="font-semibold">공연</h3>
        <div className="mx-auto grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
          {data?.pages?.map(page =>
            page.concertGetShortResponses?.map(({ status, id, ...rest }) => (
              <PerformanceInfoCard
                key={id}
                {...rest}
                id={id}
                status={status as StatusType}
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
