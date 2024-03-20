import Skeleton from '~/components/skeleton';

const PageSkeleton = () => {
  return (
    <div className="my-24 flex flex-col gap-8 rounded-md border-2 p-8 sm:rounded-none sm:border-0 sm:p-0">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-12" />
      <Skeleton className="h-12" />
      <Skeleton className="h-12" />
      <Skeleton className="h-12" />
      <Skeleton className="h-12" />
      <Skeleton className="h-12" />
      <Skeleton className="h-12" />
      <Skeleton className="h-12" />
    </div>
  );
};

export default PageSkeleton;
