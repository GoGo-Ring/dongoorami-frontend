import { Badge } from '~/components/badge';

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return (
    <div className="text-gray-700 ">
      <span>{title}</span>
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

interface IconWithCountProps {
  icon: string;
  count: number;
}

const IconWithCount = ({ icon, count }: IconWithCountProps) => {
  return (
    <div className="flex gap-1">
      <div>{icon}</div>
      <span>{count}</span>
    </div>
  );
};

interface UserIdProps {
  userId: string;
}

const UserId = ({ userId }: UserIdProps) => {
  return <span className="truncate text-sm text-gray-400">{userId}</span>;
};

interface CreatedDateProps {
  date: string;
}

const CreatedDate = ({ date }: CreatedDateProps) => {
  return <span className="text-xs text-gray-300">{date}</span>;
};

interface BadgeItemProps {
  status: '모집 중' | '모집 종료';
}

const BadgeItem = ({ status }: BadgeItemProps) => {
  return <Badge className="h-fit flex-shrink-0">{status}</Badge>;
};

const CompanionRecruitmentCard = () => {
  return (
    <div className=" w-[204px] rounded-lg border p-6">
      <div className="divide-y">
        <div className="flex w-[156px] flex-col gap-1 pb-1">
          <Title title={'글제목글제목글제목글제목글제목글제목글제목글제목'} />
          <div className="flex flex-col">
            <ConditionItem label="공연명" contents="공연명공연명" />
            <ConditionItem label="성별" contents="무관" />
            <ConditionItem label="인원 수" contents={1} />
          </div>
          <div className="flex flex-row justify-end gap-2 text-sm text-gray-300">
            <IconWithCount icon={'icon'} count={1} />
            <IconWithCount icon={'icon'} count={1} />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between pt-1">
          <div className="flex w-full flex-grow-0 flex-col">
            <UserId userId="사용자id" />
            <CreatedDate date="2024.02.19" />
          </div>
          <BadgeItem status={'모집 중'} />
        </div>
      </div>
    </div>
  );
};

export default CompanionRecruitmentCard;
