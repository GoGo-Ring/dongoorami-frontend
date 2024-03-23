'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '~/components/button';
import { Progress } from '~/components/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/tabs';
import { Textarea } from '~/components/textarea';
import useMutationUpdateMember from '~/hooks/mutations/useMutationUpdateMember';
import useFetchMember from '~/hooks/queries/useFetchMember';
import { cn } from '~/libs/utils';

import CompleteButton from './_components/complete-button';
import EditableImage from './_components/editable-image';
import EditableInput from './_components/editable-input';
import Info from './_components/info';
import Review from './_components/list-item';
import Wishes from './_components/wishes';
import { TABS_VALUE } from './constants';

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);

  const { data: member } = useFetchMember();
  const [inputs, setInputs] = useState({
    nickname: '',
    introduction: '',
  });

  const { mutate: mutateUpdateMember } = useMutationUpdateMember();

  if (!member) {
    router.push('/login');

    return null;
  }

  const handleChangeInputs = <T extends HTMLInputElement | HTMLTextAreaElement>(
    e: ChangeEvent<T>,
  ) => {
    const { name, value } = e.target;

    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitMember = (inputsObj: typeof inputs) => {
    const nextInputs = {} as typeof inputs;

    if (!(inputsObj.nickname || '').length) {
      toast.warning('수정 실패!', {
        description: '닉네임은 2글자 이상이어야 합니다.',
      });

      return;
    }

    if (inputsObj.nickname !== member?.nickname) {
      nextInputs.nickname = inputsObj.nickname;
    }
    if (inputsObj.introduction !== member?.introduction) {
      nextInputs.introduction = inputsObj.introduction;
    }

    mutateUpdateMember(nextInputs, {
      onSettled: () => setIsEdit(false),
      onSuccess: () => toast.success('수정 완료!'),
      onError: () => toast.error('정보 수정에 실패했어요. 다시 시도해주세요!'),
    });
  };

  return (
    <section className="flex flex-col gap-10 py-10">
      <div className="flex items-center justify-between gap-5">
        <EditableInput
          defaultValue={member.nickname}
          name="nickname"
          onChange={handleChangeInputs}
          disabled={!isEdit}
          className="text-2xl font-bold disabled:pl-0"
        />
        <CompleteButton
          isEdit={isEdit}
          inputs={inputs}
          handleIsEdit={() => setIsEdit(prev => !prev)}
          onComplete={onSubmitMember}
        />
      </div>

      <div className="flex items-center gap-10 sm:flex-col sm:items-start">
        <EditableImage
          nickname={member.nickname}
          profileImage={member.profileImage}
        />

        <div className="flex flex-1 flex-col gap-3 sm:w-full">
          <Info label="나이">{member.age}세</Info>
          <Info label="성별">{member.gender}</Info>
          <Info label="매너지수" className="sm:flex sm:flex-col sm:items-start">
            <div className="flex items-center gap-md sm:w-full">
              <Progress value={member.manner} className="w-1/2 sm:w-full" />
              {member.manner}%
            </div>
          </Info>

          <div className="flex items-center">
            <Wishes>
              <Button
                variant="link"
                className="block border-r pr-2 text-gray-400"
              >
                찜 목록
              </Button>
            </Wishes>
            <Link href={`${params.id}/message`} className="pl-2 text-gray-400">
              쪽지 목록
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-lg">
        <h2 className="text-xl font-bold">한 줄 소개</h2>
        <Textarea
          name="introduction"
          onChange={handleChangeInputs}
          defaultValue={member.introduction}
          disabled={!isEdit}
          className={cn(
            'min-h-40 resize-none disabled:cursor-text disabled:opacity-100',
            isEdit && 'border-primary',
          )}
        />
      </div>

      <Tabs defaultValue={TABS_VALUE.RECEIVED}>
        <TabsList>
          <TabsTrigger value={TABS_VALUE.RECEIVED}>받은 후기</TabsTrigger>
          <TabsTrigger value={TABS_VALUE.SENT}>작성 후기</TabsTrigger>
        </TabsList>
        <TabsContent value={TABS_VALUE.RECEIVED}>
          <Review
            title="concert"
            content="리뷰입니다. 리뷰입니다. 리뷰입니다."
            date={new Date().toString()}
          />
        </TabsContent>
        <TabsContent value={TABS_VALUE.SENT}></TabsContent>
      </Tabs>
    </section>
  );
};

export default Page;
