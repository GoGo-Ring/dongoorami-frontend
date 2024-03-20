import Link from 'next/link';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/dialog';
import { ScrollArea } from '~/components/scroll-area';
import useFetchWishes from '~/hooks/infinite/useInfiniteWishes';
import useIntersectionObsever from '~/hooks/useIntersectionObserver';
import { PropsWithRequiredChildren } from '~/types/utils';

import Item from './list-item';

interface WishesProps extends PropsWithRequiredChildren {}

const Wishes = ({ children }: WishesProps) => {
  const {
    data: wishes,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useFetchWishes();

  const ref = useIntersectionObsever<HTMLLIElement>({
    callback: fetchNextPage,
    condition: hasNextPage && !isFetching,
  });

  if (!wishes?.length) {
    return null;
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>좋아요 목록</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-96">
            <ul className="flex flex-col gap-sm">
              {wishes.map(wish => (
                <Link key={wish.wishId} href={`/recruitment/${wish.wishId}`}>
                  <Item
                    title={wish.title}
                    content={wish.content}
                    date={wish.updatedAt}
                    totalPeople={wish.totalPeople}
                  />
                </Link>
              ))}
              <li ref={ref} />
            </ul>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wishes;
