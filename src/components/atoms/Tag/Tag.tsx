import { FC } from 'react';

import { Props } from './types';

export const Tag: FC<Props> = (props) => {
  const { children } = props;
  return <span className="rounded-full bg-sky-50 text-xs px-4 py-1 gap-2 flex flex-row">{children}</span>;
};
Tag.displayName = 'Tag';
