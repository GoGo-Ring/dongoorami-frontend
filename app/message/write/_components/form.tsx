import { Button } from '~/components/button';
import CountErrorText from '~/components/count-error-text';
import { Input } from '~/components/input';
import useMutationCreateMessage from '~/hooks/mutations/useMutationCreateMessage';
import useForm from '~/hooks/useForm';

interface MessageWriteFormProps {
  targetId: number;
  accompanyPostId: number;
}

const MessageWriteForm = ({
  targetId,
  accompanyPostId,
}: MessageWriteFormProps) => {
  const { mutate, isPending } = useMutationCreateMessage({
    senderId: 1, // TODO: 로그인 정보로 변경
    receiverId: targetId,
    accompanyPostId,
  });

  const { handleChange, values, handleSubmit } = useForm({
    initialValues: { content: '' },
    onSubmit: ({ content }) => {
      mutate(content);
    },
  });

  const limit = 200;
  const { content } = values;
  const isDisabled = content === '' || content.length > limit || isPending;

  return (
    <form onSubmit={handleSubmit} className="flex flex-nowrap gap-4 p-4">
      <div className="w-full">
        <Input
          id="content"
          value={values.content}
          onChange={handleChange}
          placeholder="메시지를 입력해주세요"
        />
        <CountErrorText limit={limit} count={values.content.length} />
      </div>
      <Button type="submit" disabled={isDisabled}>
        전송
      </Button>
    </form>
  );
};

export default MessageWriteForm;
