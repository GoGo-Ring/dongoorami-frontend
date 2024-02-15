import Image from 'next/image';

import { Button } from '../button';
const Xlogin = () => {
  return (
    <Button className="m-1 flex h-11 w-72 cursor-pointer items-center rounded-md border bg-black p-4 hover:bg-black">
      <Image
        width="16"
        height="16"
        src="/x-white-icon.svg"
        alt="트위터 로그인"
      />
      <div className="flex w-full justify-center text-sm text-white">
        X 로그인
      </div>
    </Button>
  );
};

export default Xlogin;
