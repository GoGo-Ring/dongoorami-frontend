'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '~/components/button';
import { Progress } from '~/components/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/tabs';
import useFetchProfile from '~/hooks/queries/useFetchProfile';

import Info from '../_components/info';
import Review from '../_components/review';
import { TABS_VALUE } from '../constants';

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const { data: member } = useFetchProfile(Number(params.id));

  if (member?.currentMember) {
    router.push('/users');
  }

  if (!member) {
    return null;
  }

  return (
    <section className="flex flex-col gap-10 py-10">
      <div className="flex items-center justify-between gap-5">
        <div className="text-2xl font-bold">{member.nickname}</div>
        <Button asChild>
          <Link href={`/message/${params.id}`}>쪽지 보내기</Link>
        </Button>
      </div>

      <div className="flex items-center gap-10">
        <Image
          src={member.profileImage}
          alt={`${member.nickname} image`}
          width={144}
          height={144}
        />

        <div className="flex flex-1 flex-col gap-3">
          <Info label="나이">{member.age}세</Info>
          <Info label="성별">{member.gender}</Info>
          <Info label="매너지수" className="sm:flex sm:flex-col">
            <div className="flex items-center gap-md">
              <Progress value={member.manner} className="w-1/2" />
              {member.manner}%
            </div>
          </Info>

          <div className="flex items-center">
            <Link
              href={`${params.id}/wish`}
              className="block border-r pr-2 text-gray-400"
            >
              찜 목록
            </Link>
            <Link href={`${params.id}/message`} className="pl-2 text-gray-400">
              쪽지 목록
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-lg">
        <h2 className="text-xl font-bold">한 줄 소개</h2>
        <div className="min-h-40 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
          {member.introduction}
        </div>
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
