'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '~/components/button';
import { Progress } from '~/components/progress';
import useFetchProfile from '~/hooks/queries/useFetchProfile';

import Info from '../_components/info';
import RecievedReview from '../_components/recieved-review';

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
          <Link
            href={{
              pathname: '/message/write',
              query: { userId: `${params.id}` },
            }}
          >
            쪽지 보내기
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-10 sm:flex-col sm:items-start">
        <Image
          src={member.profileImage}
          alt={`${member.nickname} image`}
          width={144}
          height={144}
          className="group mx-auto h-36 w-36 rounded-full border border-border object-cover"
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
        </div>
      </div>

      <div className="flex flex-col gap-lg">
        <h2 className="text-xl font-bold">한 줄 소개</h2>
        <div className="min-h-40 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
          {member.introduction}
        </div>
      </div>

      <div className="flex flex-col gap-lg">
        <h2 className="text-xl font-bold">받은 후기</h2>
        <RecievedReview id={Number(params.id)} />
      </div>
    </section>
  );
};

export default Page;
