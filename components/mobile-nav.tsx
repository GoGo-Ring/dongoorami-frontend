'use client';

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { cn } from '~/libs/utils';
import { PropsWithRequiredChildren } from '~/types/utils';

import { Sheet, SheetContent, SheetTrigger } from './sheet';

interface MobileLinkProps extends PropsWithRequiredChildren<LinkProps> {
  href: string;
  onOpenChange: (isOpen: boolean) => void;
  className?: string;
}

const MobileLink = ({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
};

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
