'use client';

import { Comment } from '~/apis/scheme/comment';
import { getDate } from '~/utils/dateFormatter';

interface CommentListProps {
  comments: Comment[] | undefined;
}

const CommentList = ({ comments }: CommentListProps) => {
  if (!comments) {
    return null;
  }

  return (
    <div className="pt-8">
      {comments.length > 0 &&
        comments.map(comment => (
          <div
            key={comment.id}
            className="flex flex-col gap-3 border-t-2 py-2 pb-4"
          >
            <div className="flex justify-between">
              <p className="text-md font-semibold">{comment.memberName}</p>
              <p className="text-sm font-medium text-gray-400">
                {getDate(new Date(comment.updatedAt), 'yyyy.mm.dd')}
              </p>
            </div>
            <p className="text-md font-medium">{comment.content}</p>
          </div>
        ))}
    </div>
  );
};

export default CommentList;
