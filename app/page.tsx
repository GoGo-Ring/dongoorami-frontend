import { DummyCard } from './_components/DummyCard';
import Filter from './_components/Filter';
import StyledCarousel from './_components/StyledCarousel';

const Page = () => {
  return (
    <div>
      <StyledCarousel />
      <div className="flex w-full border">
        <div className="flex w-[220px] justify-center border p-8 sm:hidden">
          <Filter />
        </div>
        <div className="grid w-full grid-cols-3 gap-8 border p-8 sm:grid-cols-1 mainmd:grid-cols-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <DummyCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
