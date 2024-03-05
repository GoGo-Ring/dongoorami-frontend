'use client';

import Link from 'next/link';

import MainNav from './main-nav';
import MobileNav from './mobile-nav';
import SearchBar from './search-bar';

const Header = () => {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto grid h-16 min-w-page-min max-w-page-max grid-cols-3 items-center px-lg sm:grid-cols-[auto,1fr,auto] sm:gap-3">
        <MainNav />
        <MobileNav />

        <SearchBar />

        <div className="flex items-center gap-3 justify-self-end">
          <div className="h-7 w-7 rounded-full border border-black bg-red-400"></div>
          <div className="h-7 w-7 rounded-full border border-black bg-blue-400"></div>
          <Link
            href={'/login'}
            className="h-7 w-7 rounded-full border border-black bg-green-400"
          >
            log
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
