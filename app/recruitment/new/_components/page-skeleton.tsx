import React from 'react';

import Skeleton from '~/components/skeleton';

const PageSkeleton = () => {
  return (
    <div className="flex justify-center py-10">
      <div className="flex w-full flex-col gap-8 py-8">
        <Skeleton className="h-6 w-full" />

        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-1/4" />
        </div>

        <div className="flex justify-center">
          <Skeleton className="h-72 w-72" />
        </div>

        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-3/5" />
        </div>

        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
};

export default PageSkeleton;
