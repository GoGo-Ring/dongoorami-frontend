'use client';
import { useContext, createContext } from 'react';

import { Badge } from '~/components/badge';
import Icon from '~/components/icon';
import { IconNames } from '~/components/icon/icons';
import { getDate } from '~/utils/dateFormatter';

interface CompanionRecruitmentCardProps {
  id: string;
  title: string;
  concertName: string;
  writer: string;
  gender: string;
  totalPeople: number;
  viewCount: number;
  commentsCount: number;
  createdAt: Date;
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
  const { concertName, gender, totalPeople } = useContext(
    CompanionRecruitmentCardContext,
  );

  return (
    <div className="flex w-[156px] flex-col gap-1 pb-1">
      <div className="flex flex-col">
        <ConditionItem label="공연명" contents={concertName} />
        <ConditionItem label="성별" contents={gender} />
        <ConditionItem label="인원 수" contents={totalPeople} />
      </div>
    </div>
  );
};

interface IconWithCountItemProps {
  iconName: IconNames;
  count: number;
}

const IconWithCountItem = ({ iconName, count }: IconWithCountItemProps) => {
  return (
    <div className="flex gap-1">
      <Icon iconName={iconName} className="fill-gray-300" />
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
      <IconWithCountItem iconName={'chat'} count={commentsCount} />
      <IconWithCountItem iconName={'eye'} count={viewCount} />
    </div>
  );
};

const UserId = () => {
  const { writer } = useContext(CompanionRecruitmentCardContext);

  return <span className="truncate text-sm text-gray-400">{writer}</span>;
};

const CreatedDate = () => {
  const { createdAt } = useContext(CompanionRecruitmentCardContext);
  const formattedDate = getDate(createdAt, 'yyyy.mm.dd');

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
  id,
  title,
  concertName,
  writer,
  gender,
  totalPeople,
  viewCount,
  commentsCount,
  createdAt,
  status,
}: CompanionRecruitmentCardProps) => {
  return (
    <div className=" w-[204px] rounded-lg border p-6">
      <CompanionRecruitmentCardContext.Provider
        value={{
          id,
          title,
          concertName,
          writer,
          gender,
          totalPeople,
          viewCount,
          commentsCount,
          createdAt,
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
