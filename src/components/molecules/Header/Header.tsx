import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants/ROUTES';
import { NAVIGATION } from '@/constants/NAVIGATION';

export const Header = () => {
  return (
    <div className="bg-white">
      <header className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <Link href={ROUTES.HOME} aria-label="Go to hompage">
          <Image src="/petfinder-app.svg" alt="logo" height={40} width={40} role="presentation" />
        </Link>
        <nav className="text-black flex gap-4">
          {NAVIGATION.map((n) => (
            <Link key={n.url} href={n.url} aria-label={n.label}>{n.name}</Link>
          ))}
        </nav>
      </header>
    </div>
  );
};
Header.displayName = 'Header';
