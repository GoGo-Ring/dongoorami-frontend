'use client';

import Link from 'next/link';

import MainNav from './main-nav';
import MobileNav from './mobile-nav';
import SearchBar from './search-bar';
import Icon from '../icon';

const Header = () => {
  return (
    <header className="fixed top-0 z-10 w-full border-b border-gray-200 bg-background">
      <div className="mx-auto grid h-16 min-w-page-min max-w-page-max grid-cols-3 items-center px-lg sm:grid-cols-[auto,1fr,auto] sm:gap-3">
        <MainNav />
        <MobileNav />

        <SearchBar />

        <div className="flex items-center gap-3 justify-self-end">
          <Icon iconName="alarm" />
          <Link href="/message">
            <Icon iconName="message" />
          </Link>
          <Link href="/users">
            <Icon iconName="user" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
