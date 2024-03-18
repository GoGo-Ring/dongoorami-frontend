'use client';

import { useSearchParams } from 'next/navigation';

import MessageWriteForm from '~/app/message/write/_components/form';
import MessageWriteList from '~/app/message/write/_components/list';
import useFetchMember from '~/hooks/queries/useFetchMember';
import useFetchProfileById from '~/hooks/queries/useFetchMemberById';

const Page = () => {
  const contacterId = useSearchParams().get('userId');
  const { data: myData } = useFetchMember();

  const { data: contacterData } = useFetchProfileById(Number(contacterId));

  if (!contacterId || isNaN(Number(contacterId)) || !myData) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <div className="my-12 flex flex-col rounded-md border-2 p-8">
      <p className=" text-xl font-semibold">{contacterData.name}</p>
      <MessageWriteForm targetId={Number(contacterId)} accompanyPostId={3} />
      <MessageWriteList
        myProfileImage={myData.profileImage || ''}
        myName="프롱이"
        contacterId={Number(contacterId)}
        contacterName={contacterData.name}
        contacterProfileImage={contacterData.profileImage || ''}
      />
    </div>
  );
};

export default Page;
