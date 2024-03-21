import { useInfiniteQuery } from '@tanstack/react-query';

import { getMessagesById } from '~/apis/message';

const SIZE = 6;

const useInfiniteMessagesById = (partnerId: number) => {
  return useInfiniteQuery({
    queryKey: ['messages', partnerId],
    queryFn: ({ pageParam }) =>
      getMessagesById({
        partnerId,
        size: SIZE,
        cursorId: pageParam || undefined,
      }),
    initialPageParam: 0,
    getNextPageParam: lastMessage => {
      const { messageResponses } = lastMessage;
      const { length } = messageResponses;

      const lastId = length ? messageResponses[length - 1].id : undefined;

      return lastMessage.hasNext ? lastId : undefined;
    },
    select: data => data.pages.flatMap(page => page.messageResponses),
  });
};

export default useInfiniteMessagesById;
