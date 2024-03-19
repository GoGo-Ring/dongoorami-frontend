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
    return (
      <div className="flex items-center gap-3">
        <Button onClick={handleIsEdit}>취소</Button>
        <Button onClick={() => onComplete(inputs)}>완료</Button>
      </div>
    );
  }

  return <Button onClick={handleIsEdit}>수정</Button>;
};

export default CompleteButton;
