import { Badge } from '~/components/badge';

const Title = () => {
  return (
    <div className="text-gray-700 ">
      <span>글제목글제목글제목글제목글제목글제목글제목글제목</span>
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

const IconLabel = () => {
  return (
    <div className="flex gap-1">
      <div>icon</div>
      <span>1</span>
    </div>
  );
};

const CompanionRecruitmentCard = () => {
  return (
    <div className=" w-[204px] rounded-lg border p-6">
      <div className="divide-y">
        <div className="flex w-[156px] flex-col gap-1 pb-1">
          <Title />
          <div className="flex flex-col">
            <ConditionItem label="공연명" contents="공연명공연명" />
            <ConditionItem label="성별" contents="무관" />
            <ConditionItem label="인원 수" contents={1} />
          </div>
          <div className="flex flex-row justify-end gap-2 text-sm text-gray-300">
            <IconLabel />
            <div className="flex gap-1">
              <div>icon</div>
              <span>1</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between pt-1">
          <div className="flex w-full flex-grow-0 flex-col">
            <span className="truncate text-sm text-gray-400">작성자id</span>
            <span className="text-xs text-gray-300">2024.02.19</span>
          </div>
          <Badge className="h-fit flex-shrink-0">모집 여부</Badge>
        </div>
      </div>
    </div>
  );
};

export default CompanionRecruitmentCard;
