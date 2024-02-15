import Image from 'next/image';

import { Badge } from '~/components/badge';
import { getDateStringYearMonthDay } from '~/utils/dateFormatter';

interface PerformanceInfoCardProps {
  posterSrc: string;
  performanceName: string;
  performanceFacilityName: string;
  performanceStartDate: Date;
  salesStatus: string;
}

const PerformanceInfoCard = ({
  posterSrc,
  performanceName,
  performanceFacilityName,
  performanceStartDate,
  salesStatus,
}: PerformanceInfoCardProps) => {
  return (
    <div className="mr-5 w-56 cursor-pointer flex-col">
      <Image
        className="h-72 w-56 rounded-lg"
        src={posterSrc}
        alt={`${performanceName} 포스터`}
      />
      <div className="flex flex-col px-1">
        <p className="text-clip text-base font-semibold">{performanceName}</p>
        <p className="truncate text-sm">{performanceFacilityName}</p>
        <span className="text-xs text-gray-300">
          {getDateStringYearMonthDay(performanceStartDate)}
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
