import { useState } from 'react';

import { Sheet, SheetContent, SheetTrigger } from '~/components/sheet';

import MobileLink from './mobile-link';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="hidden sm:block">햄버거</button>
      </SheetTrigger>
      <SheetContent side="left">
        <MobileLink
          onOpenChange={setIsOpen}
          href="/"
          className="text-shadow font-title text-4xl text-primary"
        >
          동구라미
        </MobileLink>
        <nav className="mt-5 flex flex-col gap-4">
          <MobileLink onOpenChange={setIsOpen} href="/concerts">
            공연
          </MobileLink>
          <MobileLink onOpenChange={setIsOpen} href="/accompanies">
            동행
          </MobileLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
