import { Button } from '~/components/button';

interface UpdateCommentProps {
  handleUpdate: () => void;
  handleDelete: () => void;
}

const UpdateDeleteButtons = ({
  handleUpdate,
  handleDelete,
}: UpdateCommentProps) => {
  return (
    <>
      <div className="flex justify-end">
        <Button variant="link" onClick={handleUpdate}>
          수정
        </Button>
        <Button
          variant="link"
          className="text-destructive"
          onClick={handleDelete}
        >
          삭제
        </Button>
      </div>
    </>
  );
};

export default UpdateDeleteButtons;
