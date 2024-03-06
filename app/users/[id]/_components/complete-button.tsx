import { Button } from '~/components/button';

interface CompleteButtonProps<T> {
  isEdit: boolean;
  inputs: T;
  handleIsEdit: () => void;
  onComplete: (inputs: T) => void;
}

const CompleteButton = <T,>({
  isEdit,
  inputs,
  handleIsEdit,
  onComplete,
}: CompleteButtonProps<T>) => {
  if (isEdit) {
    return <Button onClick={() => onComplete(inputs)}>완료</Button>;
  }

  return <Button onClick={handleIsEdit}>수정</Button>;
};

export default CompleteButton;
