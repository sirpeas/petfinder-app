import { FC } from 'react';

import { Props } from './types';
import { Heading } from '@/components/atoms/Heading';

export const Hero: FC<Props> = (props) => {
  const { } = props;

  return (
    <div>
      <div className="max-w-7xl mx-auto flex justify-between items-center relative min-h-screen">
        <div className="p-4 absolute top-40">
          <Heading as="h1">Welcome to PetFinder</Heading>
        </div>
      </div>
    </div>
  );
};
Hero.displayName = 'Hero';
