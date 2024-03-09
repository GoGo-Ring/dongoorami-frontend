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
  const { mutate, isPending } = useMutationCreateMessage({
    senderId: myId,
    receiverId: targetId,
    accompanyPostId,
  });

  const { handleChange, values, handleSubmit, errors } = useForm({
    initialValues: { content: '' },
    onSubmit: values => {
      mutate(values.content);
    },
    validationRulesList: [
      {
        id: 'content',
        validate: value => value.length > 0,
        message: ' ',
      },
      {
        id: 'content',
        validate: value => value.length <= 200,
        message: '200자 이내로 입력해주세요',
      },
    ],
  });

  const isDisabled =
    Object.keys(errors).length === 0 ||
    errors?.content?.length > 0 ||
    isPending;

  return (
    <form onSubmit={handleSubmit} className="flex flex-nowrap gap-4 p-4">
      <div className="w-full">
        <Input
          id="content"
          value={values.content}
          onChange={handleChange}
          placeholder="메시지를 입력해주세요"
        />
        <ErrorText message={errors?.content} />
      </div>
      <Button type="submit" disabled={isDisabled}>
        전송
      </Button>
    </form>
  );
};

export default MessageWriteForm;
