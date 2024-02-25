import { Badge } from '~/components/badge';

const Title = () => {
  return (
    <div className="text-gray-700 ">
      <h3 className="line-clamp-3">
        {
          '글제목글제목글제목글제목글제목글제목글제목글제목글제목글제목글제목글제목글제목글제목글제목글제목'
        }
      </h3>
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
  return (
    <div className="flex w-[156px] flex-col gap-1 pb-1">
      <div className="flex flex-col">
        <ConditionItem label="공연명" contents="concertName" />
        <ConditionItem label="성별" contents="gender" />
        <ConditionItem label="인원 수" contents={1} />
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
  return (
    <div className="flex flex-row justify-end gap-2 text-sm text-gray-300">
      <IconWithCountItem icon={'icon'} count={1} />
      <IconWithCountItem icon={'icon'} count={1} />
    </div>
  );
};

const UserId = () => {
  return <span className="truncate text-sm text-gray-400">{'userId'}</span>;
};

const CreatedDate = () => {
  return <span className="text-xs text-gray-300">{'date'}</span>;
};

const BadgeItem = () => {
  return <Badge className="h-fit flex-shrink-0">{'status'}</Badge>;
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

// interface CompanionRecruitmentCardProps {
//   title: string;
//   concertName: string;
//   userId: string;
//   gender: string;
//   personCount: number;
//   viewCount: number;
//   commentsCount: number;
//   date: string;
//   status: '모집 중' | '모집 종료';
//   updatedAt: Date;
// }

const CompanionRecruitmentCard = () => {
  //   {
  //   title,
  //   concertName,
  //   userId,
  //   gender,
  //   personCount,
  //   viewCount,
  //   commentsCount,
  //   date,
  //   status,
  // }: CompanionRecruitmentCardProps
  return (
    <div className=" w-[204px] rounded-lg border p-6">
      <Title />
      <ContentField />
      <IconField />
      <FooterField />
    </div>
  );
};

export default CompanionRecruitmentCard;
