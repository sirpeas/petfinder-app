import Image from 'next/image';
import { Heading } from '@/components/atoms/Heading';

export const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col justify-between items-center relative">
      <div className="w-full p-8">
        <Heading as="h1">Welcome to PetFinder</Heading>
        <Heading as="h2" className="mt-4">
          Let&apos;s find your friend
        </Heading>
      </div>
      <Image src="/hero/hero_pets.svg" alt="hero" width={500} height={500} />
    </div>
  );
};
Hero.displayName = 'Hero';
