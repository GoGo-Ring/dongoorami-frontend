import Image from 'next/image';

import { Badge } from '~/components/badge';
import { getDateStringYearMonthDay } from '~/utils/dateFormatter';

interface PerformanceInfoCardProps {
  posterSrc: string;
  title: string;
  facilityName: string;
  startDate: Date;
  status: '공연 예정' | '공연 중' | '공연 종료';
}

const PerformanceInfoCard = ({
  posterSrc,
  title,
  facilityName,
  startDate,
  status,
}: PerformanceInfoCardProps) => {
  return (
    <div className="mr-5 w-56 cursor-pointer flex-col">
      <Image
        className="h-72 w-56 rounded-lg"
        src={posterSrc}
        alt={`${title} 포스터`}
      />
      <div className="flex flex-col px-1">
        <span className="text-clip break-all text-base font-semibold">
          {title}
        </span>
        <span className="truncate text-sm">{facilityName}</span>
        <span className="text-xs text-gray-300">
          {getDateStringYearMonthDay(startDate)}
        </span>
        <Badge className="mt-2 w-fit rounded-md" variant="outline">
          {status}
        </Badge>
      </div>
    </div>
  );
};

export default PerformanceInfoCard;
