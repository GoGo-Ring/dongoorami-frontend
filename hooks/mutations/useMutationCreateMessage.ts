import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createMessage } from '~/apis/message';

interface useMutationCreateMessageParams {
  partnerId: number;
}

const useMutationCreateMessage = ({
  partnerId,
}: useMutationCreateMessageParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createMessage({ partnerId, content }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', partnerId] });
    },
  });
};

export default useMutationCreateMessage;
