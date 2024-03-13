'use client';

import { useSearchParams } from 'next/navigation';

import MessageWriteForm from '~/app/message/write/_components/form';
import MessageWriteList from '~/app/message/write/_components/list';

const Page = () => {
  const userId = useSearchParams().get('userId');
  const userName = `유저 ${userId}`; // TODO: userName fetch

  if (!userId || isNaN(Number(userId))) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <div className="my-12 flex flex-col rounded-md border-2 p-8">
      <p className=" text-xl font-semibold">{userName}</p>
      <MessageWriteForm
        myId={2}
        targetId={Number(userId)}
        accompanyPostId={3}
      />
      <MessageWriteList targetId={Number(userId)} />
    </div>
  );
};

export default Page;
