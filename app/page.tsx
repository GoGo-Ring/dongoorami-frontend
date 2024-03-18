'use client';

import { DummyCard } from './_components/DummyCard';
import MainFilter from './_components/MainFilter';
import MobileFilter from './_components/MobileFilter';
import StyledCarousel from './_components/StyledCarousel';

const Page = () => {
  return (
    <div>
      <StyledCarousel />
      <div className="flex w-full border">
        <MainFilter />
        <div className=" grid w-full grid-cols-3 gap-8 border p-8 sm:grid-cols-1 mainmd:grid-cols-2">
          {Array.from({ length: 100 }).map((_, index) => (
            <DummyCard key={index} />
          ))}
        </div>
      </div>
      <MobileFilter />
    </div>
  );
};

export default Page;
