'use client';

import { Comment } from '~/apis/scheme/comment';
import { getDate } from '~/utils/dateFormatter';

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="pt-8">
      {comments.length > 0 &&
        comments.map(({ id, memberName, updatedAt, content }) => (
          <div key={id} className="flex flex-col gap-3 border-t-2 py-2 pb-4">
            <div className="flex justify-between">
              <p className="text-md font-semibold">{memberName}</p>
              <p className="text-sm font-medium text-gray-400">
                {getDate(new Date(updatedAt), 'yyyy.mm.dd')}
              </p>
            </div>
            <p className="text-md font-medium">{content}</p>
          </div>
        ))}
    </div>
  );
};

export default CommentList;
