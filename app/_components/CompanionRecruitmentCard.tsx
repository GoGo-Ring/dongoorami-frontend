import { ReactNode } from 'react';

import { Badge } from '~/components/badge';

interface TitleProps {
  title: string;
}

interface ConditionItemProps {
  label: '공연명' | '성별' | '인원 수';
  contents: string | number;
}

interface IconWithCountItemProps {
  icon: string;
  count: number;
}

interface UserIdProps {
  userId: string;
}

interface CreatedDateProps {
  date: `${number}.${number}.${number}`;
}

interface BadgeItemProps {
  status: '모집 중' | '모집 종료';
}

interface FieldProps {
  children: ReactNode;
}

interface FooterFieldProps {
  children: ReactNode;
  status: '모집 중' | '모집 종료';
}

interface CompanionRecruitmentCardProps {
  children?: ReactNode;
}

const Title = ({ title }: TitleProps) => {
  return (
    <div className="text-gray-700 ">
      <h3>{title}</h3>
    </div>
  );
};

const ConditionItem = ({ label, contents }: ConditionItemProps) => {
  return (
    <div className="flex gap-2 text-sm text-gray-300">
      <span className="w-12 flex-shrink-0">{label}</span>
      <span className="truncate">{contents}</span>
    </div>
  );
};

const ContentField = ({ children }: FieldProps) => {
  return (
    <div className="flex w-[156px] flex-col gap-1 pb-1">
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

const IconWithCountItem = ({ icon, count }: IconWithCountItemProps) => {
  return (
    <div className="flex gap-1">
      <div>{icon}</div>
      <span>{count}</span>
    </div>
  );
};

const IconField = ({ children }: FieldProps) => {
  return (
    <div className="flex flex-row justify-end gap-2 text-sm text-gray-300">
      {children}
    </div>
  );
};

const UserId = ({ userId }: UserIdProps) => {
  return <span className="truncate text-sm text-gray-400">{userId}</span>;
};

const CreatedDate = ({ date }: CreatedDateProps) => {
  return <span className="text-xs text-gray-300">{date}</span>;
};

const BadgeItem = ({ status }: BadgeItemProps) => {
  return <Badge className="h-fit flex-shrink-0">{status}</Badge>;
};

const FooterField = ({ children, status }: FooterFieldProps) => {
  return (
    <div className="flex flex-row items-center justify-between border-t-[1px] pt-1">
      <div className="flex w-full flex-grow-0 flex-col">{children}</div>
      <BadgeItem status={status} />
    </div>
  );
};

const CompanionRecruitmentCard = ({
  children,
}: CompanionRecruitmentCardProps) => {
  return <div className=" w-[204px] rounded-lg border p-6">{children}</div>;
};

CompanionRecruitmentCard.Title = Title;
CompanionRecruitmentCard.ConditionItem = ConditionItem;
CompanionRecruitmentCard.ContentField = ContentField;
CompanionRecruitmentCard.IconWithCountItem = IconWithCountItem;
CompanionRecruitmentCard.IconField = IconField;
CompanionRecruitmentCard.UserId = UserId;
CompanionRecruitmentCard.CreatedDate = CreatedDate;
CompanionRecruitmentCard.BadgeItem = BadgeItem;
CompanionRecruitmentCard.FooterField = FooterField;

export default CompanionRecruitmentCard;
