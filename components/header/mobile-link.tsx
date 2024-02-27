import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';

import { cn } from '~/libs/utils';
import { PropsWithRequiredChildren } from '~/types/utils';

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

export default MobileLink;
