'use client';

import { useSearchParams } from 'next/navigation';

import MessageWriteForm from '~/app/message/write/_components/form';
import MessageWriteList from '~/app/message/write/_components/list';
import useFetchMember from '~/hooks/queries/useFetchMember';
import useFetchProfileById from '~/hooks/queries/useFetchMemberById';

const Page = () => {
  const contacterId = useSearchParams().get('userId');
  const { data: myData, isError: myInfoError } = useFetchMember();

  const { data: contacterData, isError: contacterInfoError } =
    useFetchProfileById(Number(contacterId));

  if (myInfoError || contacterInfoError) {
    throw new Error('존재하지 않는 유저입니다.');
  }

  return (
    <div className="my-24 flex flex-col rounded-md border-2 p-8 sm:rounded-none sm:border-0 sm:p-0">
      <p className=" text-xl font-semibold">{contacterData.nickname}</p>
      <MessageWriteForm targetId={Number(contacterId)} />
      <MessageWriteList
        myProfileImage={myData?.profileImage || ''}
        myName={myData?.nickname || ''}
        contacterId={Number(contacterId)}
        contacterName={contacterData.nickname}
        contacterProfileImage={contacterData.profileImage || ''}
        isInifinity={true}
      />
    </div>
  );
};

export default Page;
