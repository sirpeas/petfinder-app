import { ElementType, FC } from 'react';

import { Props } from './types';
import clsx from 'clsx';

const LEVEL_TO_CLASSNAMES = {
  h1: 'text-5xl font-semibold',
  h2: 'text-3xl font-semibold',
  h3: 'text-2xl font-medium',
  h4: 'text-xl font-medium',
  h5: 'text-lg font-medium',
  h6: 'text-base font-medium',
};

export const Heading: FC<Props> = (props) => {
  const { as, className, children } = props;
  if (!as) {
    return null;
  }

  const Heading = as as ElementType;

  return <Heading className={clsx('text-gray-800', LEVEL_TO_CLASSNAMES[as], className)}>{children}</Heading>;
};
Heading.displayName = 'Heading';
