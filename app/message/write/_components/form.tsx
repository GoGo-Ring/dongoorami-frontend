import { Button } from '~/components/button';
import ErrorText from '~/components/error-text';
import { Input } from '~/components/input';
import useMutationCreateMessage from '~/hooks/mutations/useMutationCreateMessage';
import useForm from '~/hooks/useForm';

interface MessageWriteFormProps {
  targetId: number;
  myId: number;
  accompanyPostId: number;
}

const MessageWriteForm = ({
  targetId,
  myId,
  accompanyPostId,
}: MessageWriteFormProps) => {
  const { mutate } = useMutationCreateMessage({
    senderId: myId,
    receiverId: targetId,
    accompanyPostId,
  });

  const { handleUnContolledSubmit, errors } = useForm({
    initialValues: { content: '' },
    onSubmit: values => {
      mutate(values.content);
    },
    validationRulesList: [
      {
        id: 'content',
        validate: value => value.length > 0,
        message: '내용을 입력해주세요',
      },
    ],
  });

  return (
    <form
      onSubmit={handleUnContolledSubmit}
      className="flex flex-nowrap gap-4 p-4"
    >
      <div className="w-full">
        <Input id="content" />
        <ErrorText message={errors.content} />
      </div>
      <Button type="submit">전송</Button>
    </form>
  );
};

export default MessageWriteForm;
