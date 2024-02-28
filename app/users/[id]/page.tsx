'use client';

import { ChangeEvent, useState } from 'react';

import { Member } from '~/apis/scheme/member';
import { Progress } from '~/components/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/tabs';
import { Textarea } from '~/components/textarea';
import useMutationMember from '~/hooks/mutations/useMutationMember';
import useFetchMember from '~/hooks/queries/useFetchMember';
import { getAge } from '~/utils/dateFormatter';

import CompleteButton from './_components/complete-button';
import EditableInput from './_components/editable-input';
import EditableImage from './_components/editable.image';
import Info from './_components/info';
import Review from './_components/review';
import { TABS_VALUE } from './constants';

const Page = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { data: member } = useFetchMember();
  const [inputs, setInputs] = useState({
    nickname: member?.nickname,
    introduction: member?.profileImage,
  });
  const handleChangeInputs = <T extends HTMLInputElement | HTMLTextAreaElement>(
    e: ChangeEvent<T>,
  ) => {
    const { name, value } = e.target;

    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const { mutate: mutateMember } = useMutationMember();
  const onSubmitMember = (inputsObj: Partial<Member>) => {
    const nextInputs = {} as typeof inputs;

    if (inputsObj.nickname !== member?.nickname) {
      nextInputs.nickname = inputsObj.nickname;
    }
    if (inputsObj.introduction !== member?.introduction) {
      nextInputs.introduction = inputsObj.introduction;
    }

    mutateMember(nextInputs, {
      onSettled: () => setIsEdit(false),
    });
  };

  if (!member) {
    return null;
  }

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
        <CompleteButton<typeof inputs>
          isEdit={isEdit}
          inputs={inputs}
          handleIsEdit={() => setIsEdit(prev => !prev)}
          onComplete={onSubmitMember}
        />
      </div>

      <div className="flex items-center gap-10">
        <EditableImage
          nickname={member.nickname}
          profileImage={member.profileImage}
        />

        <div className="flex flex-1 flex-col gap-3">
          <Info label="나이">{getAge(new Date(member.birthdate))}세</Info>
          <Info label="성별">{member.gender}</Info>
          <Info label="매너지수">
            <Progress value={member.mannerTemperature} className="w-1/2" />
            {member.mannerTemperature}%
          </Info>
        </div>
      </div>

      <div className="flex flex-col gap-lg">
        <h2 className="text-xl font-bold">한 줄 소개</h2>
        <Textarea
          name="introduction"
          onChange={handleChangeInputs}
          defaultValue={member.introduction}
          disabled={!isEdit}
          className="min-h-40 resize-none disabled:cursor-text disabled:opacity-100"
        />
      </div>

      <Tabs defaultValue={TABS_VALUE.RECEIVED}>
        <TabsList>
          <TabsTrigger value={TABS_VALUE.RECEIVED}>받은 후기</TabsTrigger>
          <TabsTrigger value={TABS_VALUE.SENT}>작성 후기</TabsTrigger>
        </TabsList>
        <TabsContent value={TABS_VALUE.RECEIVED}>
          <Review
            user="user"
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
