import { ElementType, FC } from 'react';

import { Props } from './types';
import clsx from 'clsx';

const LEVEL_TO_CLASSNAMES = {
  h1: 'md:text-5xl sm:text-3xl text-2xl font-semibold',
  h2: 'md:text-3xl sm:text-2xl text-xl font-semibold',
  h3: 'md:text-2xl sm:text-xl text-lg font-medium',
  h4: 'md:text-xl sm:text-md text-lg font-medium',
  h5: 'md:text-lg text-md font-medium',
  h6: 'md:text-base font-medium',
};

export const Heading: FC<Props> = (props) => {
  const { as, className, children } = props;
  if (!as) {
    return null;
  }

  const Heading = as as ElementType;

  return <Heading className={clsx('text-gray-500', LEVEL_TO_CLASSNAMES[as], className)}>{children}</Heading>;
};
Heading.displayName = 'Heading';
