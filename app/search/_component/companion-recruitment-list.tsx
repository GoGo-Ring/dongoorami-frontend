import { AccompanyPostInfoList } from '~/apis/scheme/accompany';
import CompanionRecruitmentCard from '~/app/_components/CompanionRecruitmentCard';

interface CompanionRecruitmentListProps {
  data: { pages: AccompanyPostInfoList[] };
}

const CompanionRecruitmentList = ({ data }: CompanionRecruitmentListProps) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <span className="font-semibold">동행 모집</span>
      <div className="grid w-full grid-cols-3 ">
        {data.pages?.map(page =>
          page.accompanyPostInfos.map(
            ({
              id,
              createdAt,
              title,
              concertName,
              writer,
              gender,
              totalPeople,
              viewCount,
              commentCount,
              status,
            }) => (
              <CompanionRecruitmentCard
                key={id}
                id={id}
                createdAt={new Date(createdAt)}
                title={title}
                concertName={concertName}
                writer={writer}
                gender={gender}
                totalPeople={totalPeople}
                viewCount={viewCount}
                commentsCount={commentCount}
                status={status}
              />
            ),
          ),
        )}
      </div>
    </div>
  );
};

export default CompanionRecruitmentList;
