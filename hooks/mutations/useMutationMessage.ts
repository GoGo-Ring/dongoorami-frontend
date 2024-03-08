import { useMutation } from '@tanstack/react-query';

import { updateMessage } from '~/apis/message';

const useMutationMessage = () => {
  return useMutation({
    mutationFn: (id: number) => updateMessage(id),
  });
};

export default useMutationMessage;
