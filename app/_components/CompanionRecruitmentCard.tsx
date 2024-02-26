'use client';
import { useContext, createContext } from 'react';

import { Badge } from '~/components/badge';
import { getDate } from '~/utils/dateFormatter';

interface CompanionRecruitmentCardProps {
  title: string;
  concertName: string;
  userId: string;
  gender: string;
  personCount: number;
  viewCount: number;
  commentsCount: number;
  date: Date;
  status: '모집 중' | '모집 종료';
}

const CompanionRecruitmentCardContext = createContext(
  {} as CompanionRecruitmentCardProps,
);

const Title = () => {
  const { title } = useContext(CompanionRecruitmentCardContext);

  return (
    <div className="text-gray-700 ">
      <h3 className="line-clamp-3">{title}</h3>
    </div>
  );
};

interface ConditionItemProps {
  label: '공연명' | '성별' | '인원 수';
  contents: string | number;
}

const ConditionItem = ({ label, contents }: ConditionItemProps) => {
  return (
    <div className="flex gap-2 text-sm text-gray-300">
      <span className="w-12 flex-shrink-0">{label}</span>
      <span className="truncate">{contents}</span>
    </div>
  );
};

const ContentField = () => {
  const { concertName, gender, personCount } = useContext(
    CompanionRecruitmentCardContext,
  );

  return (
    <div className="flex w-[156px] flex-col gap-1 pb-1">
      <div className="flex flex-col">
        <ConditionItem label="공연명" contents={concertName} />
        <ConditionItem label="성별" contents={gender} />
        <ConditionItem label="인원 수" contents={personCount} />
      </div>
    </div>
  );
};

interface IconWithCountItemProps {
  icon: string;
  count: number;
}

const IconWithCountItem = ({ icon, count }: IconWithCountItemProps) => {
  return (
    <div className="flex gap-1">
      <div>{icon}</div>
      <span>{count}</span>
    </div>
  );
};

const IconField = () => {
  const { viewCount, commentsCount } = useContext(
    CompanionRecruitmentCardContext,
  );

  return (
    <div className="flex flex-row justify-end gap-2 text-sm text-gray-300">
      <IconWithCountItem icon={'icon'} count={viewCount} />
      <IconWithCountItem icon={'icon'} count={commentsCount} />
    </div>
  );
};

const UserId = () => {
  const { userId } = useContext(CompanionRecruitmentCardContext);

  return <span className="truncate text-sm text-gray-400">{userId}</span>;
};

const CreatedDate = () => {
  const { date } = useContext(CompanionRecruitmentCardContext);
  const formattedDate = getDate(date, 'yyyy.mm.dd');

  return <span className="text-xs text-gray-300">{formattedDate}</span>;
};

const BadgeItem = () => {
  const { status } = useContext(CompanionRecruitmentCardContext);

  return <Badge className="h-fit flex-shrink-0">{status}</Badge>;
};

const FooterField = () => {
  return (
    <div className="flex flex-row items-center justify-between border-t-[1px] pt-1">
      <div className="flex w-full flex-grow-0 flex-col">
        <UserId />
        <CreatedDate />
      </div>
      <BadgeItem />
    </div>
  );
};

const CompanionRecruitmentCard = ({
  title,
  concertName,
  userId,
  gender,
  personCount,
  viewCount,
  commentsCount,
  date,
  status,
}: CompanionRecruitmentCardProps) => {
  return (
    <div className=" w-[204px] rounded-lg border p-6">
      <CompanionRecruitmentCardContext.Provider
        value={{
          title,
          concertName,
          userId,
          gender,
          personCount,
          viewCount,
          commentsCount,
          date,
          status,
        }}
      >
        <Title />
        <ContentField />
        <IconField />
        <FooterField />
      </CompanionRecruitmentCardContext.Provider>
    </div>
  );
};

export default CompanionRecruitmentCard;
