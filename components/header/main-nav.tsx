import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '~/libs/utils';

const MainNav = () => {
  const pathname = usePathname();

  return (
    <div className="flex sm:hidden">
      <Link
        href="/"
        className="text-shadow mr-5 font-title text-4xl text-primary"
      >
        동구라미
      </Link>
      <nav className="flex items-center gap-4">
        <Link
          href="/search"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/search')
              ? 'text-foreground'
              : 'text-foreground/60',
          )}
        >
          공연
        </Link>
        <Link
          href="/accompanies"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/accompanies')
              ? 'text-foreground'
              : 'text-foreground/60',
          )}
        >
          동행
        </Link>
      </nav>
    </div>
  );
};

export default MainNav;
