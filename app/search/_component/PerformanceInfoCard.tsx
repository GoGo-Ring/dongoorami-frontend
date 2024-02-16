import Image from 'next/image';

import { Badge } from '~/components/badge';
import { getDateStringYearMonthDay } from '~/utils/dateFormatter';

interface PerformanceInfoCardProps {
  posterSrc: string;
  title: string;
  facilityName: string;
  startDate: Date;
  salesStatus: string;
}

const PerformanceInfoCard = ({
  posterSrc,
  title,
  facilityName,
  startDate,
  salesStatus,
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
        <div className="pt-2">
          <Badge className="w-fit rounded-md" variant="outline">
            {salesStatus}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default PerformanceInfoCard;
