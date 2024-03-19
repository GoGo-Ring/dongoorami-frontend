import Image from 'next/image';
import Link from 'next/link';

import { PerformanceInfoCard } from '~/apis/scheme/performance';
import { Badge } from '~/components/badge';

const PerformanceInfoCard = ({
  id,
  name,
  place,
  startedAt,
  poster,
  status,
  width = 224,
  height = 288,
}: PerformanceInfoCard) => {
  return (
    <div className="mr-5 w-56 cursor-pointer flex-col">
      <Link href={`/performance/${id}`}>
        <Image
          className="h-72 w-56 rounded-lg"
          width={width}
          height={height}
          src={poster}
          alt={`${name} 포스터`}
        />
        <div className="flex flex-col px-1">
          <h3 className="text-clip break-all text-base font-semibold">
            {name}
          </h3>
          <span className="truncate text-sm">{place}</span>
          <span className="text-xs text-gray-300">{startedAt}</span>
          <Badge className="mt-2 w-fit rounded-md" variant="outline">
            {status}
          </Badge>
        </div>
      </Link>
    </div>
  );
};

export default PerformanceInfoCard;
