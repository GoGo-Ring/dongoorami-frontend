'use client';

import { useSearchParams } from 'next/navigation';

import MainMessage from './_components/main-list';

const Page = () => {
  const page = useSearchParams().get('page') || '1';

  return (
    <section>
      <h2 className="mb-8 mt-10 text-xl font-bold">받은 쪽지함</h2>
      <MainMessage page={page} />
    </section>
  );
};

export default Page;
