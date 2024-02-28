import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import Icon from '../icon';
import { Input } from '../input';

const SearchBar = () => {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const search = ref.current;

    if (!search) {
      return;
    }

    router.push(`/search?q=${search.value}`);
    search.value = '';
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background px-2.5 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Icon iconName="search" aria-label="검색" />
      <Input
        ref={ref}
        name="search"
        type="text"
        role="search"
        placeholder="검색어를 입력해주세요."
        className="my-0 h-auto rounded-sm border-none p-0 placeholder-shown:text-ellipsis focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </form>
  );
};

export default SearchBar;
