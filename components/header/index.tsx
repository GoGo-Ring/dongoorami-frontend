'use client';

import MainNav from './main-nav';
import MobileNav from './mobile-nav';

const Header = () => {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex h-16 max-w-page-max items-center justify-between px-lg">
        <MainNav />
        <MobileNav />

        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-full border border-black bg-red-400"></div>
          <div className="h-7 w-7 rounded-full border border-black bg-blue-400"></div>
          <div className="h-7 w-7 rounded-full border border-black bg-green-400"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
