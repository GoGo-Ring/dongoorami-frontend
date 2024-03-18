import { AccompanyPostInfoList } from '~/apis/scheme/accompany';
import CompanionRecruitmentCard from '~/app/_components/CompanionRecruitmentCard';

import useIntersectionObsever from './useIntersectionObserver';

interface CompanionRecruitmentListProps {
  data: { pages: AccompanyPostInfoList[] };
  isInfinite: boolean;
  handleFetchNextPage: () => void;
  hasNextPage: boolean;
}

const CompanionRecruitmentList = ({
  data,
  isInfinite,
  handleFetchNextPage,
  hasNextPage,
}: CompanionRecruitmentListProps) => {
  const [ref] = useIntersectionObsever({ handleFetchNextPage, hasNextPage });

  return (
    <div className="flex w-full flex-col gap-6">
      <span className="font-semibold">동행 모집</span>
      <div className="grid w-full grid-cols-3 ">
        {data.pages?.map(page =>
          page.accompanyPostInfos.map(({ id, updatedAt, ...rest }) => (
            <CompanionRecruitmentCard
              key={id}
              id={id}
              createdAt={new Date(updatedAt)}
              {...rest}
            />
          )),
        )}
        {isInfinite && <div ref={ref} />}
      </div>
    </div>
  );
};

export default CompanionRecruitmentList;