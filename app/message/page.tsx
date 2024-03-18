'use client';

import { Suspense } from 'react';

import Spinner from '~/components/spinner';

import MainMessage from './_components/main-list';
import MobileMessage from './_components/mobile-list';

const Page = () => {
  return (
    <section>
      <h2 className="mb-8 mt-10 text-xl font-bold">받은 쪽지함</h2>
      <Suspense fallback={<Spinner />}>
        <MainMessage />
        <MobileMessage />
      </Suspense>
    </section>
  );
};

export default Page;
