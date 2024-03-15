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
  const [editId, setEditId] = useState(-1);
  const { mutate: deleteComment } = useMutationDeleteComment();
  const { mutate: updateComment, isPending } = useMutationUpdateComment();

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
    <div className="divide-y-2 pt-8">
      {comments.length > 0 &&
        comments.map(
          ({
            id,
            updatedAt,
            content,
            memberProfile: { profileImage, nickname, currentMember },
          }) => (
            <ul key={id}>
              {editId === id && (
                <li className="pt-4">
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
                <li className="flex flex-col gap-3 py-2">
                  <CommentContent
                    profileImage={profileImage}
                    nickName={nickname}
                    updatedAt={updatedAt}
                    content={content}
                  />
                  {currentMember && (
                    <UpdateDeleteButtons
                      handleUpdate={handleUpdate(id)}
                      handleDelete={handleDelete(id)}
                    />
                  )}
                </li>
              )}
            </ul>
          ),
        )}
    </div>
  );
};

export default CommentList;
