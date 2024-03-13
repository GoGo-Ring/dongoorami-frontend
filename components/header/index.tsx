'use client';

import { useRouter } from 'next/navigation';

import MainNav from './main-nav';
import MobileNav from './mobile-nav';
import SearchBar from './search-bar';
import Icon from '../icon';

const Header = () => {
  const router = useRouter();

  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto grid h-16 min-w-page-min max-w-page-max grid-cols-3 items-center px-lg sm:grid-cols-[auto,1fr,auto] sm:gap-3">
        <MainNav />
        <MobileNav />

        <SearchBar />

        <div className="flex items-center gap-3 justify-self-end">
          <Icon iconName="alarm" />
          <Icon iconName="message" />
          <Icon iconName="user" onClick={() => router.push('/users/2')} />
        </div>
      </div>
    </header>
  );
};

export default Header;
