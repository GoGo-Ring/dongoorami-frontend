'use client';

import { useState } from 'react';

import { Comment } from '~/apis/scheme/comment';
import CommentForm from '~/app/recruitment/[id]/_components/comment/form';
import UpdateDeleteButtons from '~/app/recruitment/[id]/_components/comment/list/buttons';
import CommentContent from '~/app/recruitment/[id]/_components/comment/list/content';
import useMutationDeleteComment from '~/hooks/mutations/useMutationDeleteComment';
import useMutationUpdateComment from '~/hooks/mutations/useMutationUpdateComment';

interface CommentListProps {
  comments: Comment[];
  accompanyPostId: string;
}

const CommentList = ({ comments, accompanyPostId }: CommentListProps) => {
  const myId = 1; // TODO: userId
  const [editId, setEditId] = useState(-1);
  const { mutate: deleteComment } = useMutationDeleteComment(accompanyPostId);
  const { mutate: updateComment, isPending } =
    useMutationUpdateComment(accompanyPostId);

  const handleUpdate = (id: number) => () => {
    setEditId(id);
  };

  const handleDelete = (id: number) => () => {
    deleteComment({ commentId: String(id) });
  };

  const handleMutateComment = (commentId: string) => (content: string) => {
    updateComment({ content, commentId });
    setEditId(-1);
  };

  return (
    <div className="pt-8">
      {comments.length > 0 &&
        comments.map(({ id, memberName, updatedAt, content, memberId }) => (
          <ul key={id}>
            {editId === id && (
              <li>
                <CommentForm
                  accompanyPostId={accompanyPostId}
                  initialComment={content}
                  commentId={id}
                  handleCancel={() => setEditId(-1)}
                  editMode
                  isPending={isPending}
                  handleMutateComment={handleMutateComment(String(id))}
                />
              </li>
            )}
            {editId !== id && (
              <li className="flex flex-col gap-3 border-t-2 py-2 pb-4">
                <CommentContent
                  memberName={memberName}
                  updatedAt={updatedAt}
                  content={content}
                />
                {myId === memberId && (
                  <UpdateDeleteButtons
                    handleUpdate={handleUpdate(id)}
                    handleDelete={handleDelete(id)}
                  />
                )}
              </li>
            )}
          </ul>
        ))}
    </div>
  );
};

export default CommentList;
