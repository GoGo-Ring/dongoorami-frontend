'use client';

import { PerformanceRecruitment } from '~/apis/scheme/accompany';

const PerformanceRecruitment = ({
  userId,
  date,
  seenCount,
  commentCount,
  title,
  content,
}: PerformanceRecruitment) => {
  return (
    <div className="relative flex w-full flex-col gap-1 rounded-lg border border-gray-200 p-4">
      <div className="flex gap-3 text-gray-300 sm:justify-between md:divide-x lg:divide-x">
        <span>{userId}</span>
        <span className="pl-3 sm:absolute sm:bottom-4 sm:right-4">{date}</span>
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
      <span className="md:hidden lg:hidden">&nbsp;</span>
    </div>
  );
};

export default PerformanceRecruitment;
