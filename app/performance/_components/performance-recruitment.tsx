'use client';

export interface PerformanceRecruitmentProps {
  userId: string;
  date: string;
  seenCount: number;
  commentCount: number;
  title: string;
  content: string;
}
const PerformanceRecruitment = ({
  userId,
  date,
  seenCount,
  commentCount,
  title,
  content,
}: PerformanceRecruitmentProps) => {
  return (
    <div className="flex flex-col gap-1 sm:w-[250px] md:w-[630px] lg:w-[840px]">
      <div className="flex gap-3 text-gray-300 sm:justify-between md:divide-x lg:divide-x">
        <span>{userId}</span>
        <span className="pl-3 sm:hidden">{date}</span>
        <div className="flex gap-3 divide-x pl-3">
          <div className="flex gap-1">
            <span>조회</span>
            <span>{seenCount}</span>
          </div>
          <div className="flex gap-1 pl-3">
            <span>댓글</span>
            <span>{commentCount}</span>
          </div>
        </div>
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="line-clamp-3">{content}</p>
      <span className="text-right text-gray-300 md:hidden lg:hidden">
        {date}
      </span>
    </div>
  );
};

export default PerformanceRecruitment;
