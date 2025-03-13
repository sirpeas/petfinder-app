'use client';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/ROUTES';
import { NAVIGATION } from '@/constants/NAVIGATION';

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="max-w-7xl mx-auto flex justify-between items-center sticky top-0 z-50 w-full">
      <div className="bg-white px-4 py-2">
        <Link href={ROUTES.HOME} aria-label="Go to hompage">
          <Image src="/petfinder-app.svg" alt="logo" height={40} width={40} role="presentation" />
        </Link>
      </div>
      <nav className="bg-white px-4 py-4 text-black flex gap-6">
        {NAVIGATION.map((n) => (
          <Link
            key={n.url}
            href={n.url}
            aria-label={n.label}
            title={n.label}
            className={clsx(
              'hover:transform-[scale(1.2)] transition-transform text-gray-500',
              pathname === n.url ? 'transform-[scale(1.2)] text-gray-900' : '',
            )}
          >
            {n.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};
Header.displayName = 'Header';
