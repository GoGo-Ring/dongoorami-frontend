import { useInfiniteQuery } from '@tanstack/react-query';

import { getMessagesById } from '~/apis/message';

interface useInfiniteMessagesByIdParmas {
  partnerId: number;
  size: number;
}

const useInfiniteMessagesById = ({
  partnerId,
  size,
}: useInfiniteMessagesByIdParmas) => {
  return useInfiniteQuery({
    queryKey: ['messages', partnerId],
    queryFn: ({ pageParam }) =>
      getMessagesById({
        partnerId,
        size,
        cursorId: pageParam || undefined,
      }),
    initialPageParam: 0,
    getNextPageParam: lastMessage => {
      const { messageResponses } = lastMessage;
      const { length } = messageResponses;

      const lastId = length ? messageResponses[length - 1].id : undefined;

      return lastMessage.hasNext ? lastId : undefined;
    },
    select: ({ pages }) => pages.flatMap(page => page.messageResponses),
  });
};

export default useInfiniteMessagesById;
