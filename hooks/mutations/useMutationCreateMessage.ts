import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createMessage } from '~/apis/message';

interface useMutationCreateMessageParams {
  senderId: number;
  receiverId: number;
  accompanyPostId?: number;
}

const useMutationCreateMessage = ({
  senderId,
  receiverId,
  accompanyPostId,
}: useMutationCreateMessageParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      createMessage({ senderId, receiverId, accompanyPostId, content }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['message', receiverId] });
    },
  });
};

export default useMutationCreateMessage;
