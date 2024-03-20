'use client';

import { Suspense } from 'react';

import Spinner from '~/components/spinner';

import FilterSearch from './_component/filter-search';

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <FilterSearch />
    </Suspense>
  );
};

export default Page;
