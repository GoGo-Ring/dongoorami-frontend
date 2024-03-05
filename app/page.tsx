import { Button } from '~/components/button';

const Page = () => {
  return (
    <div>
      <div className="flex flex-col gap-y-6 border border-black py-6 ">
        <div className="flex h-[426px] justify-center bg-yellow-500">
          <div className="h-full w-[900px] bg-yellow-300"></div>
        </div>
        <div className="h-[12px] bg-green-500"></div>
      </div>
      <Button>test</Button>
    </div>
  );
};

export default Page;
