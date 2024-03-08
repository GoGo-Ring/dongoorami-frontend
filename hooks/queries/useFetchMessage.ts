import { useQuery } from '@tanstack/react-query';

import { getMessages } from '~/apis/message';

const useFetchMessage = (size: number, page: number) => {
  const { error, ...rest } = useQuery({
    queryKey: ['message'],
    queryFn: () => getMessages(size, page),
  });

  if (error) {
    throw new Error(error.message);
  }

  return rest;
};

export default useFetchMessage;
