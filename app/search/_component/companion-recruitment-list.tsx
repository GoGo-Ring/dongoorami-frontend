import {
  AccompanyPostInfoListPage,
  CompanionRecruitGender,
  CompanionRecruitStatus,
} from '~/apis/scheme/accompany';
import CompanionRecruitmentCard from '~/app/_components/companion-recruitment-card';
import useIntersectionObsever from '~/hooks/useIntersectionObserver';
import { getDate } from '~/utils/dateFormatter';

interface CompanionRecruitmentListProps {
  data: AccompanyPostInfoListPage;
  isInfinite?: boolean;
  handleFetchNextPage: () => void;
  hasNextPage: boolean;
}

const CompanionRecruitmentList = ({
  data,
  isInfinite,
  handleFetchNextPage,
  hasNextPage,
}: CompanionRecruitmentListProps) => {
  const ref = useIntersectionObsever<HTMLDivElement>({
    callback: handleFetchNextPage,
    condition: hasNextPage,
  });

  return (
    <div className="flex w-full flex-col gap-6">
      <span className="font-semibold">동행 모집</span>
      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.pages?.map(page =>
          page?.accompanyPostInfos.map(
            ({ id, createdAt, status, gender, ...rest }) => (
              <div key={id} className="flex justify-center pt-4">
                <CompanionRecruitmentCard
                  key={id}
                  id={id}
                  createdAt={getDate(new Date(createdAt), 'yyyy.mm.dd')}
                  status={status as CompanionRecruitStatus}
                  gender={gender as CompanionRecruitGender}
                  {...rest}
                />
              </div>
            ),
          ),
        )}
        {isInfinite && <div ref={ref} />}
      </div>
    </div>
  );
};

export default CompanionRecruitmentList;
