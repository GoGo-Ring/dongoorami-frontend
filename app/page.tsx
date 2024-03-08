import { DummyCard } from './_components/DummyCard';
import Filter from './_components/Filter';
import StyledCarousel from './_components/StyledCarousel';

const Page = () => {
  return (
    <div>
      <StyledCarousel />
      <div className="flex w-full border">
        <div className="flex w-[250px] justify-center border p-8 ">
          <Filter />
        </div>
        <div className="grid w-full grid-cols-3 justify-center gap-8 border p-8">
          {Array.from({ length: 9 }).map((_, index) => (
            <DummyCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
