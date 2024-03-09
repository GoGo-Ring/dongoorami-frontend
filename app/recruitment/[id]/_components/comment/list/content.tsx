import { Comment } from '~/apis/scheme/comment';
import { getDate } from '~/utils/dateFormatter';

const CommentContent = ({
  memberName,
  updatedAt,
  content,
}: Pick<Comment, 'memberName' | 'updatedAt' | 'content'>) => {
  return (
    <>
      <div className="flex justify-between">
        <p className="text-md font-semibold">{memberName}</p>
        <p className="text-sm font-medium text-gray-400">
          {getDate(new Date(updatedAt), 'yyyy.mm.dd')}
        </p>
      </div>
      <p className="text-md font-medium">{content}</p>
    </>
  );
};

export default CommentContent;
