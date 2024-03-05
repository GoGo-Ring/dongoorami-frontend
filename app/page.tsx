import { DummyCard } from './_components/DummyCard';
import Filter from './_components/Filter';

const Page = () => {
  return (
    <div>
      <div className="flex aspect-carousel w-full flex-col gap-y-6 border border-black py-6 ">
        <div className=" flex h-full justify-center">
          <div className="w-[54px] bg-yellow-500"></div>
          <div className=" w-[900px] bg-yellow-300"></div>
          <div className="w-[54px] bg-yellow-500"></div>
        </div>
        <div className="h-[12px] bg-green-500"></div>
      </div>
      <div className="flex w-full border border-black">
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
