import { Badge } from '~/components/badge';

const Title = () => {
  return (
    <div className="text-gray-700 ">
      <span>글제목글제목글제목글제목글제목글제목글제목글제목</span>
    </div>
  );
};

const ConditionItem = () => {
  return (
    <div className="flex gap-2 text-sm text-gray-300">
      <span className="w-12 flex-shrink-0">공연명</span>
      <span className="truncate">공연명공연명</span>
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
            <ConditionItem />
            <div className="flex gap-2 text-sm text-gray-300">
              <span className="w-12">성별</span>
              <span>무관</span>
            </div>
            <div className="flex gap-2 text-sm text-gray-300">
              <span className="w-12">인원 수</span>
              <span>1</span>
            </div>
          </div>
          <div className="flex flex-row justify-end gap-2 text-sm text-gray-300">
            <div className="flex gap-1">
              <div>icon</div>
              <span>1</span>
            </div>
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
