import { useSuspenseQuery } from '@tanstack/react-query';

import { getMessagesById } from '~/apis/message';

const useFetchMessageById = (targetId: number, size: number, page: number) =>
  useSuspenseQuery({
    queryKey: ['message', targetId],
    queryFn: () => getMessagesById(targetId, size, page),
  });

export default useFetchMessageById;
