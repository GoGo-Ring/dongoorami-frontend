import { useSuspenseQuery } from '@tanstack/react-query';

import { getMessagesById } from '~/apis/message';

interface FetchMessageByIdParams {
  targetId: number;
  size: number;
  page: number;
}

const useFetchMessageById = ({
  targetId,
  size,
  page,
}: FetchMessageByIdParams) =>
  useSuspenseQuery({
    queryKey: ['message', targetId],
    queryFn: () => getMessagesById(targetId, size, page),
  });

export default useFetchMessageById;
