import { useState } from 'react';

import { Badge } from '~/components/badge';
import { Sheet, SheetContent, SheetTrigger } from '~/components/sheet';

import MobileLink from './mobile-link';
import Icon from '../icon';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="hidden sm:block">
        <Icon iconName="menu" />
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
          <MobileLink onOpenChange={setIsOpen} href="/search">
            공연
          </MobileLink>
          <MobileLink onOpenChange={setIsOpen} href="/recruitment/new">
            <Badge variant="outline">동행 글 작성</Badge>
          </MobileLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
